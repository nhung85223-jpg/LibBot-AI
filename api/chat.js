// api/chat.js
// Vercel Serverless Function - thay thế cho Express server cũ

// Lấy danh sách API keys từ env vars
const API_KEYS = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4
].filter(Boolean);

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

/**
 * LƯU Ý QUAN TRỌNG VỀ ROTATE KEY:
 * Trong Express server cũ, bạn dùng biến `currentKeyIndex` để rotate.
 * Trên Vercel Serverless, mỗi request có thể chạy trên 1 instance khác nhau
 * → biến module-level KHÔNG đáng tin để rotate tuần tự.
 * 
 * Giải pháp: dùng random pick + fallback. Nếu key này lỗi quota,
 * tự động thử key khác. Cách này thực tế còn tốt hơn rotate tuần tự
 * vì xử lý được cả lỗi 429 (quota exceeded).
 */
function getRandomKey() {
    return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
}

function getKeysShuffled() {
    // Trả về toàn bộ keys theo thứ tự ngẫu nhiên (để fallback)
    return [...API_KEYS].sort(() => Math.random() - 0.5);
}

async function callGemini(apiKey, prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        })
    });

    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}

export default async function handler(req, res) {
    // CORS (nếu sau này frontend deploy ở domain khác thì vẫn dùng được)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    // Kiểm tra có key nào không
    if (API_KEYS.length === 0) {
        console.error('Không có GEMINI_API_KEY nào được cấu hình trong env vars');
        return res.status(500).json({
            reply: 'Lỗi cấu hình: server chưa có API key. Vui lòng liên hệ quản trị viên.'
        });
    }

    try {
        const userMessage = req.body?.message;

        if (!userMessage || typeof userMessage !== 'string') {
            return res.status(400).json({
                reply: 'Câu hỏi không hợp lệ. Vui lòng nhập nội dung.'
            });
        }

        const prompt = `
Bạn là LibBot AI của Thư viện Quốc gia Việt Nam.

Người dùng hỏi:
${userMessage}

Trả lời ngắn gọn, thân thiện và chính xác.
        `.trim();

        // Thử lần lượt các key (random order) cho đến khi 1 key thành công
        const keysToTry = getKeysShuffled();
        let lastError = null;

        for (const key of keysToTry) {
            try {
                const { ok, status, data } = await callGemini(key, prompt);

                // Nếu thành công và có response hợp lệ
                if (ok && data?.candidates?.length > 0) {
                    const reply = data.candidates[0].content.parts[0].text;
                    return res.status(200).json({ reply });
                }

                // Nếu lỗi 429 (quota) hoặc 403 → thử key khác
                if (status === 429 || status === 403) {
                    console.warn(`Key bị quota/forbidden (${status}), thử key khác...`);
                    lastError = data?.error?.message || `HTTP ${status}`;
                    continue;
                }

                // Lỗi khác (400, 500...) → trả về luôn, không retry
                if (data?.error) {
                    console.error('Gemini API error:', data.error);
                    return res.status(200).json({
                        reply: 'Lỗi Gemini: ' + data.error.message
                    });
                }

                // Response không có candidates → có thể bị filter safety
                return res.status(200).json({
                    reply: 'Xin lỗi, tôi chưa thể trả lời câu hỏi này. Bạn thử hỏi khác nhé!'
                });

            } catch (err) {
                console.error('Lỗi khi gọi 1 key:', err.message);
                lastError = err.message;
                // Thử key tiếp theo
            }
        }

        // Hết tất cả keys mà vẫn lỗi
        return res.status(500).json({
            reply: `Tất cả API keys đều đang quá tải hoặc lỗi. Vui lòng thử lại sau ít phút. (${lastError || 'Unknown error'})`
        });

    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({
            reply: 'Server Error: ' + error.message
        });
    }
}