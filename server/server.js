require('dotenv').config();

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

];
console.log(API_KEYS);
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
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentKey}`,
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
// START SERVER
// ================================

app.listen(3000, () => {

    console.log(
        'Server running at http://localhost:3000'
    );
});