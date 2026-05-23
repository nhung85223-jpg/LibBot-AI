# 📚 LibBot - Trợ lý Thư viện Thông minh & Cổng Tra cứu Tài liệu

**LibBot** là một ứng dụng web (Single-Page Application) thế hệ mới, hiện đại và cao cấp dành cho hệ thống Thư viện Trường học, được tích hợp trực tiếp dữ liệu mô phỏng từ **API Thư viện Quốc gia Việt Nam**. 

Ứng dụng mang đến giải pháp toàn diện giúp độc giả tương tác thông minh bằng cả văn bản và giọng nói để tra cứu thông tin hoạt động hàng ngày, tìm kiếm sách và đăng ký các dịch vụ thẻ số trực tuyến.

---

## ✨ Điểm nổi bật & Các tính năng chính (WOW Factors)

1. **Giao diện Glassmorphism & Chủ đề Cao cấp**:
   - Ngôn ngữ thiết kế mang hơi hướng tương lai với hiệu ứng phủ mờ kính, viền phát sáng nhẹ, dải màu gradient hài hòa và chuyển động mượt mà.
   - Hỗ trợ đầy đủ **Chế độ tối (Dark Mode)** huyền bí và **Chế độ sáng (Light Mode)** trang nhã.
   - Thiết kế đáp ứng toàn diện (Responsive Grid) hiển thị tối ưu trên Máy tính (Desktop), Máy tính bảng (Tablet) và Điện thoại di động (Mobile).

2. **Trợ lý ảo LibBot tương tác thông minh**:
   - Bộ xử lý **NLP (Xử lý Ngôn ngữ Tự nhiên) mô phỏng tiếng Việt** có khả năng phân tích từ tố, nhận diện và trả lời thông minh các câu hỏi thường nhật (Giờ mở cửa, Làm thẻ độc giả, Quy chế mượn trả sách, Phí phạt quá hạn, Bản đồ chỉ đường...).
   - Hiệu ứng Mascot robot động nháy mắt sinh động và có dấu ba chấm động (`Typing Indicator`) khi "suy nghĩ".
   - Tích hợp các thẻ gợi ý câu hỏi thông dụng (`Quick Suggestion Chips`) giúp tương tác nhanh gọn.

3. **Hỗ trợ Giọng nói Tiếng Việt Thực tế (Web Speech API)**:
   - **Speech-to-Text (Nhận giọng nói)**: Người dùng có thể nhấn nút Micro và nói bằng Tiếng Việt trực tiếp, hệ thống sẽ tự động nhận diện chữ viết cực kỳ chính xác.
   - **Text-to-Speech (Đọc câu trả lời)**: LibBot tự động phát âm đọc câu trả lời bằng giọng Tiếng Việt tự nhiên. Hỗ trợ nút bật/tắt giọng nói tức thì tại thanh tiêu đề.

4. **Đồng bộ Dữ liệu & Tra cứu Tài liệu Quốc gia**:
   - Kho cơ sở dữ liệu phong phú gồm hơn 12+ đầu tài liệu kinh điển (Văn học, Công nghệ AI, Khoa học Kỹ thuật, Lịch sử, Kinh tế) được phân loại nguồn rõ ràng từ **Thư viện Quốc gia** và **Thư viện Trường**.
   - Thanh tìm kiếm thời gian thực cùng bộ lọc nâng cao (lọc theo Thể loại, Trạng thái sách, Nguồn tài liệu).
   - Xem chi tiết tài liệu trong hộp thoại Modal sang trọng kèm tính năng giả lập "Đăng ký mượn sách" thời hạn 14 ngày.

5. **Phát hành thẻ số 3D động (Digital E-Card)**:
   - Biểu mẫu đăng ký trực tuyến tiện lợi với xác thực dữ liệu đầy đủ.
   - Sau khi đăng ký thành công, hệ thống sẽ dựng **Thẻ 3D độc giả số** với hiệu ứng xoay lật 180 độ biểu diễn mã Barcode, mã QR-Code động sắc nét và các nút thao tác lưu thẻ về máy.
   - Tự động đồng bộ tên độc giả lên thanh tiêu đề hệ thống.

6. **Bản đồ Phân khu 2D Tương tác (Interactive SVG Map)**:
   - Sơ đồ mặt bằng chi tiết được vẽ trực tiếp bằng vector SVG cho độ nét vô cực.
   - Ranh giới các phân khu (Phòng đọc mở, Khu công nghệ tra cứu, Kho sách chuyên khảo, Phòng tự học nhóm) tự động đổi màu phát sáng khi di chuột qua.
   - Click chọn phân khu hiển thị hình ảnh chụp thực tế chất lượng cao, sức chứa tối đa, quy chế tiếng ồn và nút "Hỏi LibBot quy định phòng này" cực kỳ thuận tiện.

---

## 🛠️ Công nghệ sử dụng
* **Mặt trước (UI/UX)**: HTML5 Semantic, CSS3 nâng cao (Vanilla CSS), Font Awesome 6, Google Fonts (Outfit & Inter).
* **Xử lý Logic**: Vanilla JavaScript (ES6+), cấu trúc hướng sự kiện, tối ưu hóa tốc độ phản hồi.
* **API Tích hợp sẵn**: 
  - **Web Speech API**: `SpeechRecognition` (Chuyển giọng nói thành văn bản) và `SpeechSynthesis` (Chuyển văn bản thành giọng nói).
  - **SVG Vector Drawing**: Tạo bản đồ phân khu và QR-code chuẩn sắc nét.

---

## 🚀 Hướng dẫn mở và chạy ứng dụng

Vì ứng dụng được thiết kế hoàn toàn dưới dạng **Client-Side Single-Page Application** không phụ thuộc vào framework cồng kềnh, bạn có thể chạy ứng dụng cực kỳ dễ dàng theo 2 cách:

### Cách 1: Mở trực tiếp bằng trình duyệt (Cách nhanh nhất)
1. Truy cập thư mục dự án tại máy tính của bạn:
   `C:\Users\Thinkbook\.gemini\antigravity\scratch\library-chatbot\`
2. Click đúp chuột vào tệp tin **`index.html`** để mở ứng dụng trực tiếp trên trình duyệt của bạn (Khuyên dùng: **Google Chrome**, **Microsoft Edge**, hoặc **Safari** để có chất lượng hỗ trợ Web Speech giọng nói tiếng Việt tốt nhất).

### Cách 2: Chạy thông qua máy chủ cục bộ (Local Server)
Nếu bạn muốn chạy ứng dụng qua một local server phát triển để trải nghiệm các giao thức API chuẩn:
1. Mở terminal tại thư mục dự án.
2. Chạy máy chủ bằng công cụ có sẵn (ví dụ python hoặc nodejs):
   ```bash
   # Nếu dùng Python
   python -m http.server 8000
   
   # Hoặc nếu dùng NodeJS (ví dụ live-server)
   npx live-server
   ```
3. Mở trình duyệt và truy cập: `http://localhost:8000` (hoặc cổng tương ứng) để thưởng thức ứng dụng.

---

## 💡 Lưu ý khi trải nghiệm tính năng Giọng nói (Speech)
* Khi nhấn vào nút **Micro** bên cạnh ô nhập chat lần đầu tiên, trình duyệt sẽ hiển thị thông báo yêu cầu cấp quyền truy cập Mic. Vui lòng chọn **Cho phép (Allow)**.
* Hãy nói rõ ràng, tốc độ vừa phải bằng tiếng Việt.
* Đảm bảo loa thiết bị của bạn đang bật để nghe thấy giọng đọc cực kỳ ấm áp của LibBot phản hồi lại mỗi câu hỏi của bạn. Bạn có thể nhấp vào biểu tượng **Loa** trên thanh công cụ để tắt/bật giọng đọc này bất cứ lúc nào!

Chúc bạn có những trải nghiệm học tập và nghiên cứu đầy cảm hứng cùng **LibBot**! 🌟
