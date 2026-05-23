/* ==========================================================================
   LibBot JavaScript Core Logic - Cực kỳ Thông minh & Tương tác cao
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Mảng chứa các API Key để luân phiên sử dụng (Tránh lỗi 429 Quota Exceeded)
    const GOOGLE_API_KEYS = [
        'AIzaSyCO-k1nf0vEPuHPmOqE11nd2sXjDQqw4nE',
        'AIzaSyDr0ZHfzPvnH55JRAge_g0LN0Ec5Qlv7nk',
        'AIzaSyAcW6QnLpEJNxZYHD9BIjL5pv5Oeyg3-LU'
    ];

    function getRandomApiKey() {
        return GOOGLE_API_KEYS[Math.floor(Math.random() * GOOGLE_API_KEYS.length)];
    }

    // ==========================================================================
    // 1. DATA: Kho dữ liệu sách Mô phỏng API Thư viện Quốc gia & Trường học
    // ==========================================================================
    const booksDatabase = [
        {
            id: 'book-1',
            title: 'Lão Hạc (Tuyển tập truyện ngắn)',
            author: 'Nam Cao',
            category: 'Văn học & Nghệ thuật',
            genre: 'literature',
            source: 'school',
            shelf: 'Khu A - Kệ Văn Học 1',
            status: 'available',
            color: '#854d0e', // Nâu gỗ cổ điển
            desc: 'Tuyển tập những tác phẩm xuất sắc nhất của nhà văn hiện thực Nam Cao trước Cách mạng tháng Tám, phản ánh sâu sắc cuộc đời cơ cực của người nông dân Việt Nam.',
            pages: 240,
            year: 1943
        },
        {
            id: 'book-2',
            title: 'Số Đỏ',
            author: 'Vũ Trọng Phụng',
            category: 'Văn học & Nghệ thuật',
            genre: 'literature',
            source: 'national',
            shelf: 'Khu A - Kệ Văn Học 3',
            status: 'available',
            color: '#b91c1c', // Đỏ đô
            desc: 'Một tác phẩm trào phúng kinh điển tái hiện bức tranh xã hội tư sản Âu hóa kệch cỡm của Việt Nam những năm 1930 thông qua nhân vật Xuân Tóc Đỏ.',
            pages: 312,
            year: 1936
        },
        {
            id: 'book-3',
            title: 'Truyện Kiều (Bản hiệu đính)',
            author: 'Nguyễn Du',
            category: 'Văn học & Nghệ thuật',
            genre: 'literature',
            source: 'national',
            shelf: 'Khu A - Hòm Sách Cổ 1',
            status: 'reading-only',
            color: '#1e3a8a', // Xanh hoàng gia
            desc: 'Kiệt tác thơ Nôm của Nguyễn Du kể về cuộc đời chìm nổi của Thúy Kiều. Ấn bản quý hiếm với các ghi chú khảo dị và tranh minh họa nghệ thuật.',
            pages: 450,
            year: 1820
        },
        {
            id: 'book-4',
            title: 'Lập trình Python từ cơ bản đến nâng cao',
            author: 'Nguyễn Tiến Dũng',
            category: 'Công nghệ & Máy tính',
            genre: 'technology',
            source: 'school',
            shelf: 'Khu B - Kệ IT 2',
            status: 'available',
            color: '#0f766e', // Xanh lục bảo
            desc: 'Giáo trình chi tiết cung cấp kiến thức nền tảng vững chắc về ngôn ngữ Python, lập trình hướng đối tượng, xử lý dữ liệu và thuật toán cơ bản.',
            pages: 380,
            year: 2025
        },
        {
            id: 'book-5',
            title: 'Kỷ nguyên Trí tuệ Nhân tạo - AI & Tương lai',
            author: 'Trần Thế Ngọc',
            category: 'Công nghệ & Máy tính',
            genre: 'technology',
            source: 'national',
            shelf: 'Khu B - Kệ IT 5',
            status: 'borrowed',
            color: '#6d28d9', // Tím ánh kim
            desc: 'Cuốn sách khám phá các xu hướng công nghệ AI đột phá như Học sâu (Deep Learning), Mô hình ngôn ngữ lớn (LLM), ứng dụng của AI và những thách thức đạo đức đi kèm.',
            pages: 420,
            year: 2026,
            returnDate: '01/06/2026'
        },
        {
            id: 'book-6',
            title: 'Học máy ứng dụng với JavaScript',
            author: 'Đỗ Hoàng Quân',
            category: 'Công nghệ & Máy tính',
            genre: 'technology',
            source: 'school',
            shelf: 'Khu B - Kệ IT 1',
            status: 'available',
            color: '#111827', // Đen carbon
            desc: 'Hướng dẫn thực hành các kỹ thuật học máy trực tiếp trên môi trường trình duyệt bằng thư viện TensorFlow.js cho nhà phát triển web.',
            pages: 340,
            year: 2025
        },
        {
            id: 'book-7',
            title: 'Cơ học lượng tử đại cương',
            author: 'GS. Tạ Quang Bửu',
            category: 'Khoa học tự nhiên & Kỹ thuật',
            genre: 'science',
            source: 'national',
            shelf: 'Khu C - Kệ Vật Lý Lý Thuyết',
            status: 'reading-only',
            color: '#374151', // Xám đậm
            desc: 'Giáo trình học thuật cao cấp giải thích các hạt vi mô, phương trình Schrödinger và nguyên lý bất định Heisenberg dành cho sinh viên ngành lý thuyết.',
            pages: 500,
            year: 1970
        },
        {
            id: 'book-8',
            title: 'Lịch sử văn minh Việt Nam',
            author: 'Trần Trọng Kim',
            category: 'Lịch sử & Địa lý',
            genre: 'history',
            source: 'national',
            shelf: 'Khu C - Kệ Lịch Sử 2',
            status: 'available',
            color: '#7c2d12', // Màu đất nung
            desc: 'Nghiên cứu sâu rộng về nguồn gốc lịch sử, phong tục tập quán, tôn giáo và sự phát triển văn hóa nghệ thuật của dân tộc Việt Nam qua các triều đại.',
            pages: 560,
            year: 1940
        },
        {
            id: 'book-9',
            title: 'Kinh tế học vĩ mô hiện đại',
            author: 'TS. Phạm Minh Tuấn',
            category: 'Kinh tế & Quản lý',
            genre: 'economics',
            source: 'school',
            shelf: 'Khu C - Kệ Kinh Tế 4',
            status: 'available',
            color: '#14532d', // Xanh rừng rậm
            desc: 'Phân tích các chính sách tài khóa, tiền tệ, sự tăng trưởng kinh tế, lạm phát và chu kỳ kinh doanh trong bối cảnh toàn cầu hóa toàn diện.',
            pages: 410,
            year: 2024
        },
        {
            id: 'book-10',
            title: 'Khởi nghiệp tinh gọn trong kỷ nguyên số',
            author: 'Eric Ries (Dịch giả Việt)',
            category: 'Kinh tế & Quản lý',
            genre: 'economics',
            source: 'school',
            shelf: 'Khu C - Kệ Khởi Nghiệp',
            status: 'available',
            color: '#be185d', // Hồng sẫm
            desc: 'Phương pháp đổi mới sáng tạo liên tục để xây dựng các doanh nghiệp, sản phẩm thành công tối đa mà không lãng phí tài nguyên vô ích.',
            pages: 350,
            year: 2023
        },
        {
            id: 'book-11',
            title: 'Đất nước Việt Nam qua các đời',
            author: 'Đào Duy Anh',
            category: 'Lịch sử & Địa lý',
            genre: 'history',
            source: 'national',
            shelf: 'Khu C - Bản Đồ Cổ 3',
            status: 'reading-only',
            color: '#451a03', // Màu hạt dẻ
            desc: 'Khảo cứu địa lý hành chính Việt Nam lịch sử từ thời Văn Lang - Âu Lạc cho đến cuối triều Nguyễn, tài liệu địa chí đặc biệt quý báu.',
            pages: 480,
            year: 1964
        },
        {
            id: 'book-12',
            title: 'Vũ trụ học đại cương',
            author: 'Nguyễn Quang Riệu',
            category: 'Khoa học tự nhiên & Kỹ thuật',
            genre: 'science',
            source: 'national',
            shelf: 'Khu C - Vật Lý Thiên Văn',
            status: 'borrowed',
            color: '#1e1b4b', // Xanh đen vũ trụ
            desc: 'Giới thiệu về sự hình thành vũ trụ, thuyết Big Bang, hố đen và sự tiến hóa của các ngôi sao bằng ngôn ngữ khoa học đại chúng dễ hiểu.',
            pages: 280,
            year: 1999,
            returnDate: '10/06/2026'
        }
    ];

    // Các trường học được cấu hình dữ liệu chào đón và thông số riêng biệt
            // ================================
// CẤU HÌNH THƯ VIỆN QUỐC GIA VIỆT NAM
// ================================

const schoolsConfig = {
    national: {

        // ================================
        // THÔNG TIN CƠ BẢN
        // ================================

        shortName: 'NLV',

        fullName: 'Thư viện Quốc gia Việt Nam',

        englishName: 'National Library of Vietnam',

        slogan: 'Kho tàng tri thức quốc gia dành cho mọi thế hệ',

        establishedYear: '1917',

        foundedDate: '29/11/1917',

        type: 'Thư viện quốc gia',

        managingAgency: 'Bộ Văn hóa, Thể thao và Du lịch',

        website: 'https://nlv.gov.vn',

        opac: 'https://opac.nlv.gov.vn',

        email: 'info@nlv.gov.vn',

        phone: '024-38255397',

        fax: '024-38253357',

        address: '31 Tràng Thi, Phường Cửa Nam, Thành phố Hà Nội',

        googleMap: 'https://maps.google.com/?q=31+Trang+Thi+Ha+Noi',

        coordinates: {
            lat: 21.025867,
            lng: 105.849581
        },

        // ================================
        // THỐNG KÊ
        // ================================

        booksCount: '2.5M+',

        digitalDocuments: '100K+',

        readersCount: '15K+',

        newspapersMagazines: '9000+',

        rareDocuments: 'Nhiều tài liệu Hán Nôm và Đông Dương quý hiếm',

        languages: [
            'Tiếng Việt',
            'Tiếng Anh',
            'Tiếng Pháp',
            'Tiếng Trung',
            'Tiếng Nga'
        ],

        // ================================
        // GIỜ MỞ CỬA
        // ================================

        hoursWeekdays: '08:00 - 20:00',

        hoursSaturday: '08:00 - 17:00',

        hoursSunday: 'Đóng cửa',

        cardOfficeHours: {
            morning: '08:00 - 11:30',
            afternoon: '13:30 - 16:30'
        },

        // ================================
        // GIỚI THIỆU CHATBOT
        // ================================

        greeting: `
Chào mừng bạn đến với Thư viện Quốc gia Việt Nam!

Tôi là LibBot AI - trợ lý thư viện thông minh hỗ trợ:
• Tra cứu tài liệu
• Hướng dẫn làm thẻ
• Giải đáp quy định mượn trả
• Hỗ trợ sử dụng thư viện số
• Tìm kiếm sách, báo, luận văn và tài liệu nghiên cứu

Bạn cần hỗ trợ gì hôm nay?
        `,

        // ================================
        // GIỚI THIỆU THƯ VIỆN
        // ================================

        about: `
Thư viện Quốc gia Việt Nam là thư viện quốc gia lớn nhất Việt Nam,
được thành lập ngày 29/11/1917.

Thư viện có chức năng lưu chiểu quốc gia, thu thập,
bảo tồn và phổ biến di sản tri thức của dân tộc Việt Nam.

Hiện nay thư viện lưu trữ hơn 2,5 triệu đơn vị tư liệu,
bao gồm sách, báo, tạp chí, luận án, tài liệu số,
tài liệu Hán Nôm và nhiều bộ sưu tập quý hiếm.
        `,

        // ================================
        // CHỨC NĂNG - NHIỆM VỤ
        // ================================

        functions: [
            'Thu nhận lưu chiểu xuất bản phẩm quốc gia',
            'Lưu trữ và bảo tồn di sản thư tịch Việt Nam',
            'Phục vụ nghiên cứu, học tập và tra cứu',
            'Phát triển thư viện số và tài nguyên số',
            'Hướng dẫn nghiệp vụ thư viện',
            'Hợp tác quốc tế về thư viện và thông tin'
        ],

        // ================================
        // DỊCH VỤ
        // ================================

        services: [
            'Làm thẻ thư viện',
            'Mượn và trả tài liệu',
            'Đọc tại chỗ',
            'Tra cứu OPAC',
            'Thư viện số',
            'Wifi miễn phí',
            'Số hóa tài liệu',
            'Sao chụp tài liệu',
            'Hỗ trợ nghiên cứu',
            'Không gian học tập'
        ],

        // ================================
        // HƯỚNG DẪN LÀM THẺ
        // ================================

        libraryCard: {

            ageRequirement: 'Từ 18 tuổi trở lên',

            requiredDocuments: [
                'CCCD hoặc hộ chiếu',
                'Ảnh cá nhân (nếu cần)'
            ],

            fee: 'Khoảng 120.000 VNĐ/năm',

            process: [
                'Điền thông tin đăng ký',
                'Xuất trình CCCD',
                'Thanh toán lệ phí',
                'Nhận thẻ bạn đọc'
            ],

            onlineRegister: 'https://opac.nlv.gov.vn:8055'
        },

        // ================================
        // QUY ĐỊNH MƯỢN TRẢ
        // ================================

        borrowingPolicy: {

            maxBooks: 5,

            borrowDays: 14,

            renewTimes: 1,

            lateFee: 'Theo quy định của thư viện',

            note: 'Bạn đọc cần giữ gìn tài liệu cẩn thận'
        },

        // ================================
        // PHÒNG BAN
        // ================================

        departments: [
            'Phòng Đọc',
            'Phòng Tin học',
            'Phòng Bảo quản tài liệu',
            'Phòng Phân loại - Biên mục',
            'Phòng Thông tin tư liệu',
            'Phòng Nghiên cứu khoa học'
        ],

        // ================================
        // FAQ
        // ================================

        faq: [

            {
                question: 'Thư viện mở cửa lúc nào?',
                answer: 'Thư viện mở cửa từ 08:00 đến 20:00 các ngày trong tuần.'
            },

            {
                question: 'Làm thẻ thư viện cần gì?',
                answer: 'Bạn cần CCCD hoặc hộ chiếu để đăng ký thẻ.'
            },

            {
                question: 'Có wifi miễn phí không?',
                answer: 'Có, thư viện cung cấp wifi miễn phí cho bạn đọc.'
            },

            {
                question: 'Có thư viện số không?',
                answer: 'Có, bạn có thể sử dụng thư viện số và OPAC trực tuyến.'
            },

            {
                question: 'Có được mang laptop không?',
                answer: 'Có, bạn được phép sử dụng laptop trong khu vực đọc.'
            },

            {
                question: 'Có được mượn sách về nhà không?',
                answer: 'Có, theo quy định của thư viện.'
            },

            {
                question: 'Mượn tối đa bao nhiêu sách?',
                answer: 'Bạn đọc có thể mượn tối đa 5 tài liệu.'
            },

            {
                question: 'Có phòng tự học không?',
                answer: 'Có không gian học tập và nghiên cứu yên tĩnh.'
            },

            {
                question: 'Có tra cứu sách online không?',
                answer: 'Có, qua hệ thống OPAC của thư viện.'
            },

            {
                question: 'Thư viện có tài liệu tiếng Anh không?',
                answer: 'Có nhiều tài liệu ngoại văn như tiếng Anh, Pháp, Nga...'
            }

        ],

        // ================================
        // AI SYSTEM PROMPT
        // ================================

        aiPrompt: `
Bạn là trợ lý AI chính thức của Thư viện Quốc gia Việt Nam.

Nhiệm vụ:
- Hỗ trợ bạn đọc tra cứu thông tin thư viện
- Hướng dẫn làm thẻ thư viện
- Giải thích quy định mượn trả
- Hỗ trợ tìm kiếm tài liệu
- Trả lời lịch sự, ngắn gọn, chính xác
- Ưu tiên tiếng Việt
- Nếu không biết chính xác, hãy đề nghị liên hệ thư viện

Thông tin chính:
- Địa chỉ: 31 Tràng Thi, Hà Nội
- Website: https://nlv.gov.vn
- OPAC: https://opac.nlv.gov.vn
- Hotline: 024-38255397
        `,

        // ================================
        // MENU NHANH
        // ================================

        quickMenu: [
            'Giới thiệu thư viện',
            'Làm thẻ thư viện',
            'Tra cứu tài liệu',
            'Mượn trả sách',
            'Thư viện số',
            'Giờ mở cửa',
            'Nội quy thư viện',
            'Liên hệ hỗ trợ'
        ],

        // ================================
        // GỢI Ý CÂU HỎI
        // ================================

        suggestedQuestions: [
            'Cách làm thẻ thư viện?',
            'Thư viện mở cửa lúc nào?',
            'Có wifi miễn phí không?',
            'Làm sao để tra cứu sách?',
            'Có tài liệu số không?',
            'Mượn sách tối đa bao nhiêu?',
            'Có được mang laptop vào không?',
            'Thư viện có tài liệu tiếng Anh không?'
        ]
        },
        hust: {
            fullName: 'Thư viện Tạ Quang Bửu - ĐH Bách Khoa Hà Nội',
            greeting: 'Xin chào Bách Khoaer! Chào mừng bạn đến với **Thư viện Tạ Quang Bửu (HUST)**. LibBot ở đây để hỗ trợ tra cứu đồ án, mượn giáo trình kỹ thuật và đặt phòng tự học nhóm nhanh chóng!',
            booksCount: '450K+',
            readersCount: '35K+',
            hoursWeekdays: '07:30 - 21:00',
            hoursSaturday: '08:00 - 16:30',
            hoursSunday: 'Đóng cửa',
            address: 'Đại Cồ Việt, Hai Bà Trưng, Hà Nội'
        },
        vnu: {
            fullName: 'Trung tâm Thư viện & Tri thức số - ĐHQGHN (VNU-LIC)',
            greeting: 'Chào bạn! Chào mừng đến với **Thư viện Đại học Quốc gia Hà Nội (VNU-LIC)**. Tôi có thể hỗ trợ bạn tìm kiếm cơ sở dữ liệu số ngoại văn, sách chuyên khảo và đăng ký thẻ độc giả liên thông.',
            booksCount: '600K+',
            readersCount: '42K+',
            hoursWeekdays: '07:45 - 21:30',
            hoursSaturday: '08:00 - 17:00',
            hoursSunday: '08:30 - 16:30',
            address: 'Xuân Thủy, Cầu Giấy, Hà Nội'
        },
        ams: {
            fullName: 'Thư viện Trường THPT Chuyên Hà Nội - Amsterdam',
            greeting: 'Chào Amsers thân yêu! Chào mừng các em đến với không gian tự học và đọc sách sáng tạo của **Thư viện trường Ams**. Cần tìm sách tham khảo ôn thi học sinh giỏi, sách khoa học hay truyện tranh không?',
            booksCount: '50K+',
            readersCount: '3K+',
            hoursWeekdays: '08:00 - 17:00',
            hoursSaturday: '08:30 - 12:00',
            hoursSunday: 'Đóng cửa',
            address: 'Hoàng Minh Giám, Cầu Giấy, Hà Nội'
        }
    };

    // ==========================================================================
    // 2. APP STATE (Trạng thái ứng dụng)
    // ==========================================================================
    let currentSchool = 'national';
    let isSpeechEnabled = true;
    let isSpeechRecognitionActive = false;
    let speechRecognitionObj = null;
    let registeredCardData = null;
    let chatHistory = [];

    // ==========================================================================
    // 3. UI DOM ELEMENTS (Truy xuất phần tử giao diện)
    // ==========================================================================
    
    // Tab switching
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    // Theme & School selectors
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const schoolSelect = document.getElementById('school-select');
    
    // Quick widgets info
    const statBooks = document.getElementById('stat-books');
    const statActive = document.getElementById('stat-active');
    const hoursWeekdays = document.getElementById('hours-weekdays');
    const hoursSaturday = document.getElementById('hours-saturday');
    const hoursSunday = document.getElementById('hours-sunday');
    const currentOpenStatus = document.getElementById('current-open-status');
    const cardSchoolName = document.getElementById('card-school-name');
    
    // Chat components
    const chatInput = document.getElementById('chat-input-field');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const voiceInputBtn = document.getElementById('voice-input-btn');
    const clearTextBtn = document.getElementById('clear-text-btn');
    const speechIndicator = document.getElementById('speech-indicator');
    const chatMessages = document.getElementById('chat-messages');
    const quickSuggestions = document.getElementById('quick-suggestions');
    const mascotEyeAnim = document.getElementById('mascot-eye-anim');
    const botStatusText = document.getElementById('bot-status-text');

    // Search catalog components
    const bookSearchInput = document.getElementById('book-search-input');
    const searchBooksBtn = document.getElementById('search-books-btn');
    const filterCategory = document.getElementById('filter-category');
    const filterStatus = document.getElementById('filter-status');
    const filterSource = document.getElementById('filter-source');
    const booksResultsContainer = document.getElementById('books-results-container');
    const resultsCount = document.getElementById('results-count');

    // Registration card components
    const cardForm = document.getElementById('card-registration-form');
    const cardVisual = document.getElementById('library-card-visual');
    const cardDisplayName = document.getElementById('card-display-name');
    const cardDisplayId = document.getElementById('card-display-id');
    const cardDisplayType = document.getElementById('card-display-type');
    const cardDisplayExp = document.getElementById('card-display-exp');
    const cardDisplayBarcode = document.getElementById('card-display-barcode');
    const cardQrPlaceholder = document.getElementById('card-qr-placeholder');
    const cardActionButtons = document.getElementById('card-action-buttons');
    const flipCardBtn = document.getElementById('flip-card-btn');
    const downloadCardBtn = document.getElementById('download-card-btn');

    // SVG Map components
    const mapZones = document.querySelectorAll('.map-zone');
    const zoneInfoPanel = document.getElementById('zone-info-panel');
    const noZoneMsg = document.getElementById('no-zone-msg');
    const zoneContentDetails = document.getElementById('zone-content-details');
    const detailZoneTag = document.getElementById('detail-zone-tag');
    const detailZoneTitle = document.getElementById('detail-zone-title');
    const detailZoneImage = document.getElementById('detail-zone-image');
    const detailZoneDesc = document.getElementById('detail-zone-desc');
    const detailZoneCapacity = document.getElementById('detail-zone-capacity');
    const detailZoneReq = document.getElementById('detail-zone-req');
    const detailZoneNoise = document.getElementById('detail-zone-noise');
    const askZoneBotBtn = document.getElementById('ask-zone-bot-btn');

    // Modal elements
    const bookDetailsModal = document.getElementById('book-details-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBookContent = document.getElementById('modal-book-content');


    // ==========================================================================
    // 4. CORE CONTROLLERS & INITIALIZATION
    // ==========================================================================

    function init() {
        loadChatHistory();
        // Tải danh sách sách lúc đầu
        renderBooks(booksDatabase);
        
        // Cập nhật thông tin thư viện mặc định (Thư viện Quốc gia)
        updateSchoolUI('national');

        // Khởi tạo Speech Recognition (STT) nếu trình duyệt hỗ trợ
        initSpeechRecognition();

        // Thiết lập trạng thái ban đầu cho giọng nói
        updateSpeechWidgetUI();

        // Lắng nghe sự kiện chuyển đổi thời gian mở cửa thời gian thực
        checkRealTimeLibraryStatus();
        setInterval(checkRealTimeLibraryStatus, 60000); // 1 phút check 1 lần
    }

    // ==========================================================================
    // 5. UTILITY & LAYOUT FUNCTIONS (Chức năng tiện ích giao diện)
    // ==========================================================================
// ===== LƯU LỊCH SỬ CHAT =====

function saveChatHistory() {

    localStorage.setItem(
        'libbot_chat_history',
        JSON.stringify(chatHistory)
    );
}


// ===== LOAD LỊCH SỬ CHAT =====

function loadChatHistory() {

    const savedHistory =
        localStorage.getItem(
            'libbot_chat_history'
        );

    if (!savedHistory) return;

    try {

        chatHistory =
            JSON.parse(savedHistory);

        chatMessages.innerHTML = '';

        chatHistory.forEach(msg => {

            appendMessage(
                msg.sender,
                msg.text,
                false
            );

        });

    } catch(error) {

        console.error(
            'Lỗi load lịch sử',
            error
        );
    }
}
    // Tab Switching
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            
            navItems.forEach(n => n.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            item.classList.add('active');
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Đóng mobile sidebar khi chạm chọn tab
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Bấm ra ngoài mobile sidebar để đóng
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Theme Toggle Theme (Sáng/Tối)
    themeToggleBtn.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        }
    });

    // Cập nhật giao diện khi đổi trường học
    schoolSelect.addEventListener('change', (e) => {
        const schoolValue = e.target.value;
        currentSchool = schoolValue;
        updateSchoolUI(schoolValue);
        
        // Kích hoạt LibBot gửi tin chào hỏi thương hiệu trường mới
        sendBotGreeting(schoolValue);
    });

    function updateSchoolUI(schoolKey) {
        const config = schoolsConfig[schoolKey];
        if (!config) return;

        // Cập nhật Widgets bên phải Chat Tab
        statBooks.textContent = config.booksCount;
        statActive.textContent = config.readersCount;
        hoursWeekdays.textContent = config.hoursWeekdays;
        hoursSaturday.textContent = config.hoursSaturday;
        hoursSunday.textContent = config.hoursSunday;
        
        // Thẻ thành viên số
        cardSchoolName.textContent = config.fullName.toUpperCase();
        
        // Check trạng thái mở/đóng cửa
        checkRealTimeLibraryStatus();
    }

    function checkRealTimeLibraryStatus() {
        const config = schoolsConfig[currentSchool];
        if (!config) return;

        const now = new Date();
        const day = now.getDay(); // 0: Chủ nhật, 1-6: Thứ 2-7
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeVal = hour * 100 + minute; // e.g. 11:15 -> 1115

        let isOpen = false;
        let scheduleText = '';

        if (day >= 1 && day <= 5) { // Trong tuần
            scheduleText = config.hoursWeekdays;
        } else if (day === 6) { // Thứ 7
            scheduleText = config.hoursSaturday;
        } else { // Chủ nhật
            scheduleText = config.hoursSunday;
        }

        if (scheduleText && scheduleText !== 'Đóng cửa') {
            const parts = scheduleText.split(' - ');
            if (parts.length === 2) {
                const openParts = parts[0].split(':').map(Number);
                const closeParts = parts[1].split(':').map(Number);
                const openVal = openParts[0] * 100 + openParts[1];
                const closeVal = closeParts[0] * 100 + closeParts[1];
                
                if (timeVal >= openVal && timeVal <= closeVal) {
                    isOpen = true;
                }
            }
        }

        if (isOpen) {
            currentOpenStatus.className = 'hours-status-badge open';
            currentOpenStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Đang mở cửa';
        } else {
            currentOpenStatus.className = 'hours-status-badge closed';
            currentOpenStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Hiện đã đóng cửa';
        }
    }


    // ==========================================================================
    // 6. TEXT-TO-SPEECH (Phát âm) & SPEECH-TO-TEXT (Nhận giọng nói)
    // ==========================================================================
    
    // Toggle Button Voice TTS Indicator
    speechIndicator.addEventListener('click', () => {
        isSpeechEnabled = !isSpeechEnabled;
        updateSpeechWidgetUI();
        
        // Nếu tắt giọng nói thì lập tức ngắt tiếng đang phát
        if (!isSpeechEnabled) {
            window.speechSynthesis.cancel();
        }
    });

    function updateSpeechWidgetUI() {
        if (isSpeechEnabled) {
            speechIndicator.classList.remove('muted');
            speechIndicator.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Giọng nói: Bật</span>';
        } else {
            speechIndicator.classList.add('muted');
            speechIndicator.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Giọng nói: Tắt</span>';
        }
    }

    // Text to Speech (Phát âm tiếng Việt thông minh)
    function speakText(text) {
        if (!isSpeechEnabled) return;
        
        // Cancel any current ongoing speech
        window.speechSynthesis.cancel();
        
        // Xóa markdown hoặc các thẻ HTML cơ bản trước khi đọc để tự nhiên
        const plainText = text
            .replace(/\*\*|__/g, '')
            .replace(/\*|_/g, '')
            .replace(/<[^>]*>/g, '')
            .replace(/[-*#]/g, '');

        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = 'vi-VN';
        
        // Tìm kiếm và lựa chọn giọng tiếng Việt phù hợp nhất
        const voices = window.speechSynthesis.getVoices();
        const viVoice = voices.find(voice => voice.lang.includes('vi') || voice.lang.includes('VN'));
        if (viVoice) {
            utterance.voice = viVoice;
        }

        utterance.rate = 1.5; // Tốc độ
        utterance.pitch = 1.5; // Độ trầm bổng
        
        // Thay đổi Mascot khi đang phát giọng
        utterance.onstart = () => {
            mascotEyeAnim.classList.add('speaking');
            const mouth = mascotEyeAnim.querySelector('.mascot-mouth');
            mouth.style.height = '10px';
            mouth.style.borderRadius = '50%';
        };

        utterance.onend = () => {
            mascotEyeAnim.classList.remove('speaking');
            const mouth = mascotEyeAnim.querySelector('.mascot-mouth');
            mouth.style.height = '4px';
            mouth.style.borderRadius = '0 0 5px 5px';
        };

        window.speechSynthesis.speak(utterance);
    }

    // Speech-to-Text (Nhận diện giọng nói Tiếng Việt)
    function initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            voiceInputBtn.style.display = 'none'; // Trình duyệt không hỗ trợ thì ẩn mic
            console.log('Trình duyệt không hỗ trợ Web Speech API.');
            return;
        }

        speechRecognitionObj = new SpeechRecognition();
        speechRecognitionObj.continuous = false;
        speechRecognitionObj.lang = 'vi-VN';
        speechRecognitionObj.interimResults = false;
        speechRecognitionObj.maxAlternatives = 1;

        speechRecognitionObj.onstart = () => {
            isSpeechRecognitionActive = true;
            voiceInputBtn.classList.add('recording');
            chatInput.placeholder = 'Đang lắng nghe giọng nói của bạn... Hãy nói đi!';
            botStatusText.textContent = 'ChatBot đang nghe...';
            botStatusText.style.color = '#ef4444';
            
            // Dừng phát âm của chatbot nếu người dùng nói chen ngang
            window.speechSynthesis.cancel();
        };

        speechRecognitionObj.onend = () => {
            isSpeechRecognitionActive = false;
            voiceInputBtn.classList.remove('recording');
            chatInput.placeholder = 'Nhập câu hỏi của bạn tại đây hoặc nhấn nút mic để nói...';
            botStatusText.textContent = 'Đang trực tuyến • Sẵn sàng hỗ trợ bạn';
            botStatusText.style.color = '#10b981';
        };

        speechRecognitionObj.onerror = (e) => {
            console.error('Speech recognition error:', e.error);
            isSpeechRecognitionActive = false;
            voiceInputBtn.classList.remove('recording');
        };

        speechRecognitionObj.onresult = (event) => {
            const speechToTextResult = event.results[0][0].transcript;
            chatInput.value = speechToTextResult;
            clearTextBtn.style.display = 'block';
            
            // Gửi tin nhắn tự động sau khi nói xong
            setTimeout(() => {
                handleUserSendMessage();
            }, 800);
        };
    }

    voiceInputBtn.addEventListener('click', () => {
        if (!speechRecognitionObj) return;

        if (isSpeechRecognitionActive) {
            speechRecognitionObj.stop();
        } else {
            speechRecognitionObj.start();
        }
    });


    // ==========================================================================
    // 7. NLP CHAT ENGINE (Bộ não Chatbot thông minh giả lập)
    // ==========================================================================

    // Xóa nội dung input và tự động ẩn nút clear
    chatInput.addEventListener('input', () => {
        if (chatInput.value.trim() !== '') {
            clearTextBtn.style.display = 'block';
        } else {
            clearTextBtn.style.display = 'none';
        }
    });

    clearTextBtn.addEventListener('click', () => {
        chatInput.value = '';
        clearTextBtn.style.display = 'none';
        chatInput.focus();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserSendMessage();
        }
    });

    sendChatBtn.addEventListener('click', () => {
        handleUserSendMessage();
    });

    // Click quick suggestion chips
    quickSuggestions.addEventListener('click', (e) => {
        const chip = e.target.closest('.suggest-chip');
        if (!chip) return;
        
        const query = chip.getAttribute('data-query');
        chatInput.value = query;
        handleUserSendMessage();
    });

    function sendBotGreeting(schoolValue) {
        const config = schoolsConfig[schoolValue];
        if (!config) return;

        // Xóa các tin nhắn chào hỏi cũ
        chatMessages.innerHTML = '';

        // Đẩy tin chào thương hiệu mới
        setTimeout(() => {
            appendMessage('bot', config.greeting);
        }, 300);
    }

    async function handleUserSendMessage() {
        const message = input.value.trim();
        const userText = chatInput.value.trim();
        if (userText === '') return;

        // Thêm câu hỏi của user vào khung chat
        appendMessage('user', userText);
        
        // Reset input
        chatInput.value = '';
        clearTextBtn.style.display = 'none';

        // Tạo hiệu ứng Typing Dot
        const typingIndicator = showTypingIndicator();

        // Xử lý câu trả lời bằng Google Gemini API (AI)
        try {
            const botResponse = await generateGeminiResponse(userText);
            typingIndicator.remove();
            appendMessage('bot', botResponse);
        } catch (error) {
            console.error("Gemini API Error:", error);
            typingIndicator.remove();
            appendMessage('bot', 'Xin lỗi, hệ thống AI của thư viện đang gặp sự cố kết nối hoặc API Key bị lỗi. Vui lòng thử lại sau nhé!');
        }
    }

    async function generateGeminiResponse(query) {

        try {
    
            const response =
                await fetch(
                    'http://localhost:3000/api/chat',
                    {
                        method: 'POST',
    
                        headers: {
                            'Content-Type':
                            'application/json'
                        },
    
                        body: JSON.stringify({
                            message: query
                        })
                    }
                );
    
            const data =
                await response.json();
                console.log(data);
            return data.reply;
    
        } catch(error) {
    
            console.error(error);
    
            return 'Không thể kết nối AI server.';
        }
    }

    function appendMessage(
        sender,
        text,
        save = true
    ) {
        const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${sender}-message`;

        const iconHtml = sender === 'bot' 
            ? '<div class="message-icon"><i class="fa-solid fa-robot"></i></div>'
            : '<div class="message-icon"><i class="fa-solid fa-user"></i></div>';

        // Parse markdown text simple
        const formattedText = parseSimpleMarkdown(text);

        bubble.innerHTML = `
            ${iconHtml}
            <div class="message-content">
                ${formattedText}
                <span class="message-time">${time}</span>
            </div>
        `;

        chatMessages.appendChild(bubble);
        
        // Auto scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Nếu là bot nói thì kích hoạt TTS phát âm nếu bật
        if (sender === 'bot') {
            speakText(text);
        }
        if (save) {

            chatHistory.push({
                sender,
                text,
                time: Date.now()
            });
        
            saveChatHistory();
        }
    }

    function showTypingIndicator() {
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble bot-message typing-indicator-bubble';
        bubble.innerHTML = `
            <div class="message-icon"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return bubble;
    }

    // Markdown Parser đơn giản (hỗ trợ in đậm **, danh sách -, link và nút bấm phản hồi)
    function parseSimpleMarkdown(text) {
        let parsed = text;
        
        // Bold: **text**
        parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Unordered lists: - item
        parsed = parsed.replace(/^- (.*?)$/gm, '<li>$1</li>');
        parsed = parsed.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
        
        // Line breaks \n
        parsed = parsed.replace(/\n/g, '<br>');

        return parsed;
    }

    // BỘ NÃO NLP HỆ THỐNG: Xử lý từ khóa tiếng Việt đa dạng
    function generateNlpResponse(query) {
        const q = query.toLowerCase().trim();

        if (matchKeywords(q, ['chào', 'hello', 'hi', 'xin chào'])) {
            return `Xin chào. Tôi là Trợ lý số LibBot. Tôi có thể hỗ trợ bạn tra cứu tài liệu và quy định thư viện.`;
        }

        if (matchKeywords(q, ['cảm ơn', 'thank', 'cám ơn'])) {
            return `Trân trọng. Chúc bạn nghiên cứu hiệu quả.`;
        }

        if (matchKeywords(q, ['bạn là ai', 'tên gì', 'giới thiệu bản thân'])) {
            return `Tôi là LibBot - Trợ lý số chuyên nghiệp được kết nối với cơ sở dữ liệu VNU-LIC (Trung tâm Thư viện và Tri thức Số ĐHQGHN), hỗ trợ tra cứu thông tin học thuật trực tuyến.`;
        }

        if (matchKeywords(q, ['giờ', 'mở cửa', 'đóng cửa', 'thời gian'])) {
            return `Thời gian hoạt động:\n- Thứ 2 - Thứ 6: 08:00 - 20:00\n- Thứ 7: 09:00 - 17:00\n- Chủ nhật & Lễ: Nghỉ phục vụ.`;
        }

        if (matchKeywords(q, ['làm thẻ', 'đăng ký thẻ', 'e-card', 'thẻ thư viện'])) {
            return `Để cấp phát Thẻ thư viện số:\n1. Truy cập tab **Dịch vụ Thẻ & Quy định**.\n2. Điền thông tin định danh sinh viên.\n3. Nhận mã thẻ định danh điện tử ngay lập tức.`;
        }

        if (matchKeywords(q, ['mượn sách', 'quy định mượn', 'quy chế'])) {
            return `Quy chế mượn tài liệu:\n- Số lượng tối đa: 3 cuốn (Thẻ Standard) hoặc 7 cuốn (Thẻ Nghiên cứu).\n- Thời hạn: 14 ngày (Standard) hoặc 30 ngày (Nghiên cứu).\n- Yêu cầu xuất trình mã QR thẻ điện tử khi mượn.`;
        }

        if (matchKeywords(q, ['phạt', 'quá hạn', 'mất sách', 'bồi thường'])) {
            return `Chế tài vi phạm:\n- Trễ hạn: Phạt 2.000đ/ngày/cuốn (Sách chuyên khảo: 5.000đ/ngày).\n- Làm mất/hỏng: Bồi thường sách mới tương đương hoặc 200% giá trị bìa sách.`;
        }

        if (matchKeywords(q, ['sơ đồ', 'bản đồ', 'phân khu', 'vị trí'])) {
            return `Sơ đồ không gian:\n- Khu A: Phòng Đọc Mở.\n- Khu B: Khu Công Nghệ & Tra Cứu.\n- Khu C: Kho Sách Chuyên Khảo.\n- Khu D: Phòng Tự Học Nhóm.\nChi tiết vui lòng xem tại tab **Sơ đồ Thư viện**.`;
        }

        if (matchKeywords(q, ['tìm sách', 'tra cứu sách'])) {
            return `Truy vấn cơ sở dữ liệu VNU-LIC... Vui lòng chuyển sang tab **Tra cứu Tài liệu** nhập tên sách hoặc mã ISBN để lấy dữ liệu thời gian thực từ hệ thống.`;
        }

        return `Truy vấn không xác định. Vui lòng đặt câu hỏi cụ thể về: giờ mở cửa, cách làm thẻ, quy chế mượn trả, hoặc sử dụng chức năng Tra cứu Tài liệu.`;
    }

    // Helper kiểm tra mảng từ khóa có khớp
    function matchKeywords(text, keywords) {
        return keywords.some(keyword => text.includes(keyword.toLowerCase()));
    }


    // ==========================================================================
    // 8. BOOK CATALOG SEARCH SYSTEM (Mô phỏng API Tra cứu sách)
    // ==========================================================================

    function renderBooks(booksList) {
        booksResultsContainer.innerHTML = '';

        if (booksList.length === 0) {
            booksResultsContainer.innerHTML = `
                <div class="no-results-alert" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fa-solid fa-book-skull fa-4x" style="margin-bottom: 15px; color: var(--text-muted);"></i>
                    <h4>Không tìm thấy tài liệu phù hợp</h4>
                    <p>Hãy thử tìm bằng từ khóa khác hoặc điều chỉnh các bộ lọc phân loại nguồn.</p>
                </div>
            `;
            resultsCount.textContent = `Tìm thấy 0 tài liệu`;
            return;
        }

        booksList.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.setAttribute('data-id', book.id);

            // Nhãn trạng thái sách dịch sang tiếng Việt
            let statusText = 'Sẵn sàng';
            let statusClass = 'available';
            if (book.status === 'reading-only') {
                statusText = 'Đọc tại chỗ';
                statusClass = 'reading-only';
            } else if (book.status === 'borrowed') {
                statusText = 'Đang mượn';
                statusClass = 'borrowed';
            }

            // Nhãn nguồn dữ liệu
            const sourceText = book.source === 'national' ? 'TVQG VN' : 'Trường';
            const sourceClass = book.source;

            const coverHtml = book.thumbnail 
                ? `<img src="${book.thumbnail}" alt="Cover" style="width:100%; height:100%; object-fit:cover; position:absolute; z-index:1; top:0; left:0;">`
                : `<div class="book-cover-fallback" style="background-color: ${book.color};"><span class="cover-title">${book.title}</span><span class="cover-author">${book.author}</span></div>`;

            card.innerHTML = `
                <div class="book-cover-wrapper">
                    <span class="source-tag ${sourceClass}">${sourceText}</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    ${coverHtml}
                </div>
                <div class="book-info">
                    <span class="book-category">${book.category}</span>
                    <h4 class="book-title" title="${book.title}">${book.title}</h4>
                    <span class="book-author">Tác giả: ${book.author}</span>
                </div>
                <div class="book-meta-footer">
                    <span class="book-shelf"><i class="fa-solid fa-map-pin"></i> ${book.shelf}</span>
                    <button class="book-view-details-btn" data-id="${book.id}">
                        Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            `;

            booksResultsContainer.appendChild(card);
        });

        resultsCount.textContent = `Hiển thị ${booksList.length} tài liệu phù hợp`;
    }

    let currentPage = 1;

    // Logic tìm kiếm sử dụng Google Books API (Mô phỏng Kho dữ liệu Quốc gia)
    async function handleBookSearch(page = 1) {
        const keyword = bookSearchInput.value.trim();
        currentPage = page;
        const startIndex = (page - 1) * 12;
        
        // Nếu không có từ khóa, hiển thị mặc định hoặc yêu cầu nhập
        if (keyword === '') {
            renderBooks(booksDatabase);
            document.getElementById('pagination-controls').style.display = 'none';
            return;
        }

        document.getElementById('pagination-controls').style.display = 'flex';
        document.getElementById('current-page-indicator').textContent = `Trang ${page}`;
        document.getElementById('prev-page-btn').disabled = (page === 1);

        booksResultsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><i class="fa-solid fa-spinner fa-spin fa-3x" style="color: #6366f1;"></i><p style="margin-top: 15px; color: var(--text-secondary);">Đang truy vấn dữ liệu từ hệ thống Quốc Gia...</p></div>';
        resultsCount.textContent = `Đang tìm kiếm (Trang ${page})...`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                const apiBooks = data.items.map((item, index) => {
                    const info = item.volumeInfo;
                    return {
                        id: item.id,
                        title: info.title || 'Không có tiêu đề',
                        author: info.authors ? info.authors.join(', ') : 'Chưa rõ tác giả',
                        category: info.categories ? info.categories[0] : 'Sách Tổng hợp',
                        genre: 'general',
                        source: index % 2 === 0 ? 'national' : 'school', // Phân chia kho sách ảo
                        shelf: `Khu ${String.fromCharCode(65 + Math.floor(Math.random() * 4))} - Kệ ${Math.floor(Math.random() * 10) + 1}`,
                        status: Math.random() > 0.3 ? 'available' : 'borrowed',
                        color: ['#854d0e', '#b91c1c', '#1e3a8a', '#0f766e', '#6d28d9', '#111827'][Math.floor(Math.random() * 6)],
                        desc: info.description || 'Chưa có mô tả chi tiết cho ấn phẩm này.',
                        pages: info.pageCount || 0,
                        year: info.publishedDate || 'N/A',
                        thumbnail: info.imageLinks ? info.imageLinks.thumbnail.replace('http:', 'https:') : null
                    };
                });
                
                // Lưu lại vào cache
                booksDatabase.length = 0;
                booksDatabase.push(...apiBooks);
                
                renderBooks(apiBooks);
            } else {
                renderBooks([]);
            }
        } catch (error) {
            console.error("Books API Error:", error);
            booksResultsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #ef4444;"><i class="fa-solid fa-triangle-exclamation fa-3x"></i><p style="margin-top: 15px;">Lỗi kết nối API tìm kiếm sách. Vui lòng thử lại sau.</p></div>';
        }
    }

    // Gắn sự kiện cho các điều khiển tìm kiếm
    document.getElementById('search-books-btn').addEventListener('click', () => handleBookSearch(1));
    bookSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleBookSearch(1);
    });

    // Sự kiện phân trang
    document.getElementById('prev-page-btn').addEventListener('click', () => {
        if (currentPage > 1) handleBookSearch(currentPage - 1);
    });
    document.getElementById('next-page-btn').addEventListener('click', () => {
        handleBookSearch(currentPage + 1);
    });
    filterCategory.addEventListener('change', handleBookSearch);
    filterStatus.addEventListener('change', handleBookSearch);
    filterSource.addEventListener('change', handleBookSearch);


    // ==========================================================================
    // 9. MODAL DIALOG: Xem chi tiết sách & Mô phỏng mượn sách
    // ==========================================================================

    booksResultsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.book-view-details-btn');
        if (!btn) return;
        
        const bookId = btn.getAttribute('data-id');
        const bookObj = booksDatabase.find(b => b.id === bookId);
        if (bookObj) {
            openBookDetailsModal(bookObj);
        }
    });

    function openBookDetailsModal(book) {
        let statusText = 'Sẵn sàng mượn về nhà';
        let statusClass = 'available';
        let actionBtnHtml = `<button class="modal-action-btn primary" id="modal-borrow-action" data-id="${book.id}"><i class="fa-solid fa-bookmark"></i> Đăng ký mượn ngay</button>`;

        if (book.status === 'reading-only') {
            statusText = 'Ấn phẩm đặc biệt - Chỉ đọc tại phòng chuyên khảo';
            statusClass = 'reading-only';
            actionBtnHtml = `<button class="modal-action-btn secondary" disabled><i class="fa-solid fa-lock"></i> Sách đọc tại chỗ</button>`;
        } else if (book.status === 'borrowed') {
            statusText = `Đã được mượn (Dự kiến trả ngày ${book.returnDate || '05/06/2026'})`;
            statusClass = 'borrowed';
            actionBtnHtml = `<button class="modal-action-btn secondary" id="modal-wait-action" data-id="${book.id}"><i class="fa-solid fa-bell"></i> Đăng ký nhận thông báo trả sách</button>`;
        }

        const modalCoverHtml = book.thumbnail 
            ? `<img src="${book.thumbnail}" alt="Cover" style="width:100%; height:100%; object-fit:cover; border-radius: 10px;">`
            : `<div style="width:100%; height:100%; background-color: ${book.color}; padding: 25px; display:flex; flex-direction:column; justify-content:space-between; color:#fff; border-radius: 10px;"><h4 style="font-size:16px; font-weight:800; line-height:1.2;">${book.title}</h4><span style="font-size:10px; color:rgba(255,255,255,0.7);">${book.author}</span></div>`;

        modalBookContent.innerHTML = `
            <div class="modal-book-layout">
                <div class="modal-book-cover" style="padding:0; border:none; box-shadow:none;">
                    ${modalCoverHtml}
                </div>
                <div class="modal-book-info">
                    <div class="modal-book-header">
                        <h3>${book.title}</h3>
                        <span class="author">Tác giả: <strong>${book.author}</strong></span>
                    </div>

                    <div class="modal-metadata-grid">
                        <div class="modal-meta-item">
                            <strong>THỂ LOẠI</strong>
                            <span>${book.category}</span>
                        </div>
                        <div class="modal-meta-item">
                            <strong>NƠI LƯU TRỮ</strong>
                            <span>${book.shelf}</span>
                        </div>
                        <div class="modal-meta-item">
                            <strong>ẤN BẢN NĂM</strong>
                            <span>${book.year} (Bản in ${book.pages} trang)</span>
                        </div>
                        <div class="modal-meta-item">
                            <strong>NGUỒN DỮ LIỆU</strong>
                            <span>${book.source === 'national' ? 'Thư viện Quốc gia VN' : 'Thư viện Trường'}</span>
                        </div>
                    </div>

                    <p class="modal-book-desc">${book.desc}</p>
                    
                    <div style="font-size:12px; margin-top:5px;">
                        Trạng thái: <span class="status-badge ${statusClass}" style="position:static; padding:2px 8px;">${statusText}</span>
                    </div>

                    <div class="modal-actions">
                        ${actionBtnHtml}
                        <button class="modal-action-btn secondary" id="modal-share-bot" data-id="${book.id}"><i class="fa-solid fa-comments"></i> Hỏi LibBot</button>
                    </div>
                </div>
            </div>
        `;

        bookDetailsModal.classList.add('active');
        bookDetailsModal.setAttribute('aria-hidden', 'false');

        // Lắng nghe sự kiện trong modal
        document.getElementById('modal-share-bot').addEventListener('click', () => {
            bookDetailsModal.classList.remove('active');
            document.getElementById('nav-chat').click();
            chatInput.value = `Tìm sách ${book.title}`;
            handleUserSendMessage();
        });

        const borrowBtn = document.getElementById('modal-borrow-action');
        if (borrowBtn) {
            borrowBtn.addEventListener('click', () => {
                // Giả lập kiểm tra xem đã đăng ký thẻ chưa
                if (!registeredCardData) {
                    alert('Bạn cần đăng ký Thẻ Thư viện số E-Card tại tab "Dịch vụ Thẻ & Quy định" trước khi thực hiện mượn sách!');
                    bookDetailsModal.classList.remove('active');
                    document.getElementById('nav-services').click();
                    return;
                }

                // Thực hiện đổi trạng thái mượn ảo
                book.status = 'borrowed';
                book.returnDate = new Date(Date.now() + 14*24*60*60*1000).toLocaleDateString('vi-VN'); // + 14 ngày
                
                alert(`Đăng ký mượn cuốn sách "${book.title}" THÀNH CÔNG!\nHạn trả sách dự kiến: ${book.returnDate}.\nHệ thống đã gửi phiếu mượn đến tài khoản E-Card của bạn.`);
                
                bookDetailsModal.classList.remove('active');
                handleBookSearch(); // Cập nhật lưới sách

                // Gửi tin nhắn bot thông báo tức thì
                document.getElementById('nav-chat').click();
                appendMessage('bot', `Chúc mừng độc giả **${registeredCardData.name}** đã mượn thành công tài liệu **"${book.title}"** thuộc **${book.source === 'national' ? 'hệ thống Thư viện Quốc gia Việt Nam' : 'thư viện trường'}**.\n- Hạn trả: **${book.returnDate}**.\n- Vị trí nhận sách: **${book.shelf}**.\nVui lòng xuất trình thẻ E-Card khi đến quầy thủ thư nhận sách bản in.`);
            });
        }
    }

    // Đóng Modal
    modalCloseBtn.addEventListener('click', () => {
        bookDetailsModal.classList.remove('active');
        bookDetailsModal.setAttribute('aria-hidden', 'true');
    });

    bookDetailsModal.addEventListener('click', (e) => {
        if (e.target === bookDetailsModal) {
            bookDetailsModal.classList.remove('active');
            bookDetailsModal.setAttribute('aria-hidden', 'true');
        }
    });


    // ==========================================================================
    // 10. E-SERVICES & DIGITAL E-CARD GENERATOR (Biểu mẫu thẻ 3D trực tuyến)
    // ==========================================================================

    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullname = document.getElementById('reg-fullname').value.trim();
        const studentId = document.getElementById('reg-student-id').value.trim();
        const className = document.getElementById('reg-class').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const cardType = document.getElementById('reg-card-type').value;

        // Bắt đầu hiệu ứng loading làm thẻ thư viện giả lập cực chất
        const submitBtn = document.getElementById('submit-reg-btn');
        const origBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xác thực & Tạo lập mã QR...';

        setTimeout(() => {
            // Hạn dùng 1 năm
            const expDate = new Date();
            expDate.setFullYear(expDate.getFullYear() + 1);
            const expString = expDate.toLocaleDateString('vi-VN');

            // Tạo mã Barcode và QR Code giả lập
            const barcodeVal = '893' + Math.floor(1000000000 + Math.random() * 9000000000);

            registeredCardData = {
                name: fullname,
                id: studentId,
                class: className,
                email: email,
                type: cardType === 'standard' ? 'Standard E-Card' : 'Research Premium E-Card',
                exp: expString,
                barcode: barcodeVal
            };

            // Cập nhật lên thẻ 3D trực quan mặt trước
            cardDisplayName.textContent = registeredCardData.name.toUpperCase();
            cardDisplayId.textContent = registeredCardData.id.toUpperCase();
            cardDisplayType.textContent = registeredCardData.type;
            cardDisplayExp.textContent = registeredCardData.exp;

            // Đổi hình đại diện mock từ tên chữ cái đầu tiên
            const firstChar = registeredCardData.name.charAt(0).toUpperCase();
            const avatarMock = document.querySelector('.holder-avatar-mock');
            avatarMock.innerHTML = `<span style="font-size:18px; font-weight:800; color:#fff;">${firstChar}</span>`;
            avatarMock.style.background = 'var(--gradient-accent)';

            // Cập nhật mặt sau
            cardDisplayBarcode.textContent = registeredCardData.barcode;
            
            // Vẽ QR Code động trực tiếp bằng Inline SVG để nét căng cực đẹp
            cardQrPlaceholder.innerHTML = `
                <svg viewBox="0 0 100 100" style="width:100%; height:100%;">
                    <!-- Background -->
                    <rect width="100" height="100" fill="#fff"/>
                    <!-- QR Mock Patterns -->
                    <rect x="5" y="5" width="25" height="25" fill="#000"/>
                    <rect x="10" y="10" width="15" height="15" fill="#fff"/>
                    <rect x="13" y="13" width="9" height="9" fill="#000"/>
                    
                    <rect x="70" y="5" width="25" height="25" fill="#000"/>
                    <rect x="75" y="10" width="15" height="15" fill="#fff"/>
                    <rect x="78" y="13" width="9" height="9" fill="#000"/>
                    
                    <rect x="5" y="70" width="25" height="25" fill="#000"/>
                    <rect x="10" y="75" width="15" height="15" fill="#fff"/>
                    <rect x="13" y="78" width="9" height="9" fill="#000"/>

                    <rect x="40" y="40" width="20" height="20" fill="#000"/>
                    <rect x="45" y="45" width="10" height="10" fill="#fff"/>
                    
                    <rect x="40" y="5" width="8" height="20" fill="#000"/>
                    <rect x="5" y="40" width="20" height="8" fill="#000"/>
                    
                    <rect x="70" y="40" width="20" height="20" fill="#000"/>
                    <rect x="40" y="70" width="20" height="20" fill="#000"/>
                    <!-- Small random data points -->
                    <rect x="40" y="30" width="5" height="5" fill="#000"/>
                    <rect x="50" y="35" width="4" height="4" fill="#000"/>
                    <rect x="30" y="50" width="6" height="3" fill="#000"/>
                    <rect x="65" y="65" width="3" height="3" fill="#000"/>
                    <rect x="65" y="30" width="5" height="4" fill="#000"/>
                    <rect x="30" y="65" width="4" height="5" fill="#000"/>
                    
                    <rect x="85" y="85" width="10" height="10" fill="#000"/>
                </svg>
            `;

            // Hoàn tất loading
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnHtml;

            // Kích hoạt lật thẻ biểu diễn 3D và hiển thị các nút chức năng thẻ
            cardActionButtons.style.display = 'flex';
            
            // Tự động lật thẻ mặt sau cho người dùng thấy QR Code sau khi phát hành
            cardVisual.classList.add('flipped');

            // Cập nhật vai trò Header
            document.querySelector('.user-name').textContent = fullname;
            document.querySelector('.user-role').textContent = 'Độc giả E-Card';

            alert(`Phát hành thẻ E-Card Thư viện thành công!\nHọ tên: ${fullname}\nMã độc giả số: ${studentId}\nChúc bạn có trải nghiệm tuyệt vời!`);

            // Đổi tin nhắn Mascot trong AI chat
            document.getElementById('nav-chat').click();
            appendMessage('bot', `Tuyệt vời! Tôi đã chính thức cấp phát **Thẻ Thư viện số E-Card** cho bạn.\n- Chủ thẻ: **${fullname.toUpperCase()}**\n- Mã ID độc giả: **${studentId}**\n- Hạn dùng: **${expString}**\nBây giờ bạn đã có toàn quyền mượn sách trực tuyến trong kho Thư viện Quốc gia Việt Nam rồi nhé!`);

        }, 1500);
    });

    // Sự kiện nút Lật Thẻ
    flipCardBtn.addEventListener('click', () => {
        cardVisual.classList.toggle('flipped');
    });

    // Sự kiện tải thẻ về máy (giả lập download)
    downloadCardBtn.addEventListener('click', () => {
        if (!registeredCardData) return;
        alert(`Đang khởi tạo tải xuống hình ảnh Thẻ độc giả số "${registeredCardData.name.toUpperCase()} E-Card"... \nTải xuống thành công! Lưu trữ dưới tên tệp ecard_library_${registeredCardData.id}.png.`);
    });


    // ==========================================================================
    // 11. INTERACTIVE SVG MAP EVENTS (Sơ đồ phân khu tương tác)
    // ==========================================================================

    const mapZonesData = {
        reading: {
            title: 'Phòng Đọc Mở (Khu A)',
            tag: 'Phân khu A',
            image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80',
            desc: 'Không gian phòng đọc mở được thiết kế cực kỳ hiện đại với nguồn ánh sáng tự nhiên ngập tràn. Thích hợp cho độc giả đọc sách thư giãn, nghiên cứu các tài liệu báo chí, tạp chí định kỳ và các tác phẩm văn học nghệ thuật đại chúng.',
            capacity: '150 chỗ ngồi thoải mái',
            requirement: 'Quét thẻ E-Card tự động ở cửa phòng đọc',
            noise: 'Yên lặng tương đối (Có thể trao đổi rất khẽ)'
        },
        computer: {
            title: 'Khu Công Nghệ & Tra Cứu (Khu B)',
            tag: 'Phân khu B',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80',
            desc: 'Khu vực công nghệ số được trang bị hệ thống 50 máy tính cấu hình cao kết nối Internet tốc độ cao, cho phép tra cứu toàn diện kho dữ liệu số của Thư viện Quốc gia. Có cổng tai nghe học thuật, máy in và máy quét scan tài liệu miễn phí.',
            capacity: '50 máy trạm làm việc song song',
            requirement: 'Đăng ký phiên máy qua cổng LibBot hoặc thẻ độc giả',
            noise: 'Yên lặng (Đeo tai nghe khi nghe âm thanh)'
        },
        archive: {
            title: 'Kho Sách Chuyên Khảo & Nghiên Cứu (Khu C)',
            tag: 'Phân khu C',
            image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80',
            desc: 'Khu vực lưu trữ các bản sách cổ quý hiếm, từ điển đa ngôn ngữ, giáo trình đại học nâng cao và báo cáo nghiên cứu học thuật của quốc gia. Các tài liệu tại đây được bảo tồn nghiêm ngặt và hạn chế mang ra ngoài.',
            capacity: '60 người nghiên cứu chuyên sâu',
            requirement: 'Chỉ chấp nhận thẻ độc giả Nghiên cứu đặc quyền',
            noise: 'Yên lặng tuyệt đối (Không tiếng ồn)'
        },
        study: {
            title: 'Phòng Tự Học & Thảo Luận Nhóm (Khu D)',
            tag: 'Phân khu D',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
            desc: 'Hệ thống 8 phòng họp kính cách âm hiện đại có trang bị màn hình chiếu tương tác và bảng viết thông minh. Thích hợp cho các buổi học nhóm thảo luận dự án nghiên cứu khoa học, thuyết trình thử nghiệm và làm việc nhóm sáng tạo.',
            capacity: 'Từ 6 - 15 người / phòng họp kính',
            requirement: 'Đặt phòng trước 24 giờ trên biểu mẫu E-Service trực tuyến',
            noise: 'Trao đổi thảo luận tự do trong không gian cách âm'
        }
    };

    mapZones.forEach(zone => {
        zone.addEventListener('click', () => {
            // Bỏ active cũ
            mapZones.forEach(z => z.classList.remove('active'));
            
            // Active vùng hiện tại
            zone.classList.add('active');

            const zoneKey = zone.getAttribute('data-zone');
            const data = mapZonesData[zoneKey];
            if (data) {
                // Ẩn tin nhắn chỉ dẫn ban đầu
                noZoneMsg.style.display = 'none';

                // Nạp dữ liệu vào bảng thông tin bên phải bản đồ
                detailZoneTag.textContent = data.tag;
                detailZoneTitle.textContent = data.title;
                detailZoneImage.src = data.image;
                detailZoneDesc.textContent = data.desc;
                detailZoneCapacity.textContent = data.capacity;
                detailZoneReq.textContent = data.requirement;
                detailZoneNoise.textContent = data.noise;

                // Hiện nội dung
                zoneContentDetails.style.display = 'flex';
            }
        });
    });

    // Nút "Hỏi ChatBot quy định phòng này" kích hoạt Chatbot giải đáp tự động
    askZoneBotBtn.addEventListener('click', () => {
        const currentZoneTitle = detailZoneTitle.textContent;
        document.getElementById('nav-chat').click();
        
        chatInput.value = `Quy định phòng ${currentZoneTitle} như thế nào?`;
        handleUserSendMessage();
    });


    // ==========================================================================
    // 12. RUN INITIALIZATION
    // ==========================================================================
    init();

});
