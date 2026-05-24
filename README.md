# LibBot AI - Vercel Serverless Setup

## 📁 Cấu trúc mới (sau refactor)

```
LIBBOT-AI/
├── api/
│   └── chat.js              ← Serverless function (POST /api/chat)
├── index.html               ← Frontend (giữ nguyên)
├── app.js                   ← Frontend (giữ nguyên)
├── style.css                ← Frontend (giữ nguyên)
├── package.json             ← Đã move ra root
├── vercel.json              ← Config Vercel
├── .gitignore
└── .env.example             ← Template env vars
```

## 🚀 Các bước deploy

### Bước 1: Cập nhật code local

1. **Xóa** folder `server/` cũ (hoặc backup riêng)
2. **Tạo** folder `api/` ở root
3. **Copy** file `api/chat.js` vào
4. **Move** `package.json` ra root (file mới)
5. **Tạo** `vercel.json` ở root
6. **Tạo** `.gitignore` (nếu chưa có)

### Bước 2: Thêm Environment Variables trên Vercel

Vào: `Vercel Dashboard → lib-bot-ai → Settings → Environment Variables`

Thêm các biến (chọn Environment: **Production, Preview, Development**):

| Key                | Value                         |
| ------------------ | ----------------------------- |
| `GEMINI_API_KEY_1` | (key thật của bạn)            |
| `GEMINI_API_KEY_2` | (key thật)                    |
| `GEMINI_API_KEY_3` | (key thật)                    |
| `GEMINI_API_KEY_4` | (key thật, nếu có)            |
| `GEMINI_MODEL`     | `gemini-2.5-flash` (optional) |

**QUAN TRỌNG:** Sau khi add env vars, phải **Redeploy** mới có hiệu lực.

### Bước 3: Commit & Push

```bash
git add .
git commit -m "refactor: migrate Express server to Vercel Serverless Functions"
git push origin main
```

Vercel sẽ tự động deploy.

### Bước 4: Test

Mở: `https://lib-bot-ai.vercel.app`

Hoặc test API trực tiếp bằng curl:

```bash
curl -X POST https://lib-bot-ai.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Giờ mở cửa thư viện?"}'
```

## 💻 Local development

```bash
npm install -g vercel
cp .env.example .env.local
# Sửa .env.local, điền các API keys thật
vercel dev
```

Truy cập: `http://localhost:3000`

## ⚠️ Cảnh báo bảo mật cần xử lý NGAY

File `app.js` (frontend) đang **hard-code 3 Google API keys** ở dòng 8-12:

```javascript
const GOOGLE_API_KEYS = [
  "AIzaSyCO-k1nf0vEPuHPmOqE11nd2sXjDQqw4nE",
  "AIzaSyDr0ZHfzPvnH55JRAge_g0LN0Ec5Qlv7nk",
  "AIzaSyAcW6QnLpEJNxZYHD9BIjL5pv5Oeyg3-LU",
];
```

**Hành động ngay:**

1. Vào [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → **Revoke** 3 keys này
2. Tạo keys mới, **chỉ** lưu trong Vercel Environment Variables
3. Xóa array `GOOGLE_API_KEYS` và function `getRandomApiKey()` trong `app.js` (không dùng nữa, vì đã chuyển sang backend)

## 🔍 Khác biệt chính so với Express server cũ

| Express (cũ)                    | Vercel Serverless (mới)                      |
| ------------------------------- | -------------------------------------------- |
| `app.listen(PORT)` chạy 24/7    | Function khởi tạo theo từng request          |
| `currentKeyIndex` lưu state     | Random pick + fallback (state không tin cậy) |
| `express.json()` parse body     | Vercel parse tự động → `req.body`            |
| `app.use(cors())`               | Set CORS headers thủ công                    |
| `app.use(express.static())`     | Vercel tự serve static files ở root          |
| Bind `__dirname` để load `.env` | Vercel inject env vars tự động               |
