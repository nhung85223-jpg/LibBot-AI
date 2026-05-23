const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
    quiet: true
});

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


// ================================
// GEMINI API KEYS
// ================================

const API_KEYS = [

    process.env.GEMINI_API_KEY_1,

    process.env.GEMINI_API_KEY_2,

    process.env.GEMINI_API_KEY_3,

    process.env.GEMINI_API_KEY_4

].filter(Boolean);

// Model cũ gemini-1.5-flash đã ngừng trên v1beta — đổi qua .env nếu cần
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

let currentKeyIndex = 0;


// ================================
// CHAT API
// ================================

app.post('/api/chat', async (req, res) => {

    try {

        const userMessage =
            req.body.message;

        const currentKey =
            API_KEYS[currentKeyIndex];

        const prompt = `
Bạn là LibBot AI của
Thư viện Quốc gia Việt Nam.

Người dùng hỏi:
${userMessage}

Trả lời ngắn gọn,
thân thiện và chính xác.
        `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${currentKey}`,
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                    'application/json'
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data =
            await response.json();
            console.log(data);
            let reply = 'Không có phản hồi';

            if (
                data.candidates &&
                data.candidates.length > 0
            ) {
                reply =
                    data.candidates[0]
                    .content.parts[0]
                    .text;
            }
            else if (data.error) {
            
                reply =
                    'Lỗi Gemini: ' +
                    data.error.message;
            }

        // ================================
        // CHUYỂN SANG KEY TIẾP THEO
        // ================================

        currentKeyIndex =
            (currentKeyIndex + 1)
            % API_KEYS.length;

        res.json({
            reply
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server Error'
        });
    }
});


// ================================
// STATIC FRONTEND
// ================================

app.use(express.static(path.join(__dirname, '..')));

// ================================
// START SERVER
// ================================

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Nhấn Ctrl+C để dừng server.');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\nCổng ${PORT} đã bị chiếm (process Node cũ vẫn chạy).`);
        console.error('Tìm PID:  netstat -ano | findstr ":3000"');
        console.error('Dừng:    taskkill /PID <pid> /F\n');
    } else {
        console.error(err);
    }
    process.exit(1);
});