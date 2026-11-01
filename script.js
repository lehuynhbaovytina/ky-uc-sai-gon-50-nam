/* =====================================================
   KÝ ỨC SÀI GÒN — script.js
   1. CONFIG & NỘI DUNG  (sửa ở đây)
   2. Ảnh (có ảnh dự phòng nếu thiếu)
   3. Sách StPageFlip
   4. Chuyển động & điều hướng
   ===================================================== */

/* ---------- 1A. ĐƯỜNG DẪN ẢNH (thay ảnh ở đây) ---------- */
const IMAGES = {
  hero:       'images/hero-placeholder.jpg',
  history:    'images/saigon-history.jpg',
  past:       'images/saigon-past.jpg',
  present:    'images/saigon-present.jpg',
  culture:    'images/saigon-culture.jpg',
  culture3:   'images/saigon-culture-3.jpg',
  culture2:   'images/saigon-culture-2.jpg',
  technology: 'images/saigon-technology.jpg',
  technology2:'images/saigon-technology-2.jpg',
  techPast:   'images/saigon-tech-past.jpg',
  closing:    'images/saigon-closing.jpg',
  bookScience:'images/saigon-technology.jpg'
};

/* ---------- 1B. CÀI ĐẶT CHUYỂN ĐỘNG ---------- */
const MOTION = {
  flipTime: 900,      // thời gian lật trang (ms) — do StPageFlip điều khiển
  ease: 0.1,          // độ mượt theo con trỏ (0.05 = rất chậm, 0.3 = nhanh)
  ringEase: 0.2,      // vòng tròn con trỏ
  scrollEase: 0.12,   // độ mượt parallax khi cuộn
  stagger: 90,        // khoảng trễ giữa các phần tử hiện ra (ms)
  tilt: 5,            // độ nghiêng tối đa (độ), 0 = tắt
  imgShift: 10,       // ảnh dịch theo con trỏ (px), 0 = tắt
  magnet: 6,          // nút hút theo con trỏ (px), 0 = tắt
  coverTilt: 9,       // độ nghiêng tối đa của bìa sách (độ), 0 = tắt
  smoothScroll: 0.1   // độ mượt khi cuộn (0.05 = rất mượt/chậm, 0.2 = nhanh)
};

/* ---------- 1C. NỘI DUNG SÁCH (thêm / bớt chương, trang ở đây) ----------
   Mỗi chương = 1 trang mở chương (bên trái) + các trang nội dung. Số trang nội dung của MỖI chương phải LẺ
   (để tổng số trang chẵn và trang mở chương luôn nằm bên trái). Nội dung viết bằng HTML đơn giản: <p>, <ul class="bul|tl">, <b>. */
const BOOK = {
  coverTitle: 'Ký ức<br>Sài Gòn',
  coverSub: 'Lịch sử hình thành',
  epigraph: 'Mỗi thành phố đều có một cuốn sử viết bằng gạch đá, và một cuốn khác viết bằng ký ức của những người từng sống nơi đó. Ấn phẩm này mời bạn lật mở cả hai: từ Sài Gòn xưa với bến nước và những con phố cũ, đến Thành phố Hồ Chí Minh hiện đại của ngày hôm nay, nơi mỗi chặng đường đều để lại dấu ấn về những sự kiện, cột mốc tiêu biểu và giá trị của nơi đây.',
  chapters: [
    { no: '1', name: 'Sài Gòn xưa', period: '1954 – 1991', lede: 'Từ đô thị thời chia cắt đến Thành phố mang tên Bác.',
      img: 'past', alt: 'Ảnh tư liệu Sài Gòn xưa', cap: 'Sài Gòn xưa · [nguồn: Báo Tuổi Trẻ]',
      pages: [
        { kicker: '1954 – 1975', title: 'Đô thị thời chia cắt',
          html: '<p>Sau Hiệp định Genève năm 1954, đất nước tạm thời chia cắt hai miền, Sài Gòn trở thành thủ đô của chính quyền Việt Nam Cộng hòa. Thành phố phát triển về thương mại, báo chí, nghệ thuật và giải trí.</p><p>Quá trình đô thị hóa cùng làn sóng nhập cư khiến dân số tăng nhanh, góp phần tạo nên đời sống văn hóa đa dạng với nhiều phong tục, ẩm thực, tín ngưỡng và lối sống khác nhau. Tuy nhiên, chiến tranh cũng gây ra nhiều vấn đề như thất nghiệp, thiếu nhà ở, chênh lệch mức sống và bất ổn xã hội.</p>' },
        { kicker: 'Dấu ấn kiến trúc', title: 'Công trình còn lại đến nay',
          html: '<p>Một số công trình kiến trúc tiêu biểu còn tồn tại đến ngày nay:</p><ul class="bul"><li><b>Dinh Độc Lập</b> (nay là Hội trường Thống Nhất): từng là dinh tổng thống và trung tâm quyền lực của chính quyền Việt Nam Cộng hòa, gắn liền với sự kiện ngày 30/4/1975.</li><li><b>Thư viện Quốc gia</b> (nay là Thư viện Khoa học Tổng hợp TP.HCM): khánh thành năm 1971, góp phần lưu giữ tài liệu và phát triển văn hóa đọc.</li><li><b>Khách sạn Caravelle</b> (1959): khách sạn hiện đại tiêu biểu thời bấy giờ, gắn với ngoại giao, báo chí quốc tế và đời sống xã hội Sài Gòn.</li></ul>' },
        { kicker: '1975 – 1976', title: 'Thống nhất non sông',
          html: '<p>Ngày 30/4/1975, Sài Gòn – Gia Định được giải phóng, thành phố bước vào giai đoạn khôi phục và xây dựng sau chiến tranh.</p><p>Chính quyền tập trung khắc phục hậu quả, ổn định đời sống người dân, đẩy mạnh cứu trợ, giáo dục, chăm sóc sức khỏe, giải quyết việc làm và khôi phục sản xuất. Tuy nhiên, thành phố vẫn đối mặt với nhiều khó khăn như thiếu lương thực, hàng hóa, vốn và những hạn chế từ cơ chế bao cấp.</p>' },
        { kicker: 'Từ 1976 · Thời kỳ Đổi mới', title: 'Thành phố mang tên Bác',
          html: '<p>Ngày 2/7/1976, Quốc hội quyết định đổi tên Sài Gòn – Gia Định thành Thành phố Hồ Chí Minh, mở ra một giai đoạn phát triển mới.</p><p>Công cuộc Đổi mới năm 1986 từng bước chuyển nền kinh tế sang cơ chế thị trường định hướng xã hội chủ nghĩa, tạo điều kiện phát triển các thành phần kinh tế và mở rộng sản xuất, kinh doanh. Năm 1991, Khu chế xuất Tân Thuận ra đời, đánh dấu bước chuyển quan trọng trong thu hút đầu tư và phát triển công nghiệp.</p>' },
        { kicker: 'Dòng thời gian', title: 'Những dấu mốc 1954 – 1991',
          html: '<ul class="tl"><li><b>1954</b><span>Hiệp định Genève; đất nước tạm thời chia cắt hai miền</span></li><li><b>1971</b><span>Thư viện Quốc gia được khánh thành</span></li><li><b>30/4/1975</b><span>Sài Gòn – Gia Định được giải phóng</span></li><li><b>2/7/1976</b><span>Đổi tên thành Thành phố Hồ Chí Minh</span></li><li><b>1986</b><span>Công cuộc Đổi mới</span></li><li><b>1991</b><span>Khu chế xuất Tân Thuận ra đời</span></li></ul>' }
      ] },
    { no: '2', name: 'Sài Gòn nay', period: '1990 – nay', lede: 'Hội nhập, đổi thay diện mạo và mở rộng không gian phát triển.',
      img: 'present', alt: 'Ảnh Sài Gòn – TP. Hồ Chí Minh hiện nay', cap: 'TP. Hồ Chí Minh hôm nay · [nguồn: Internet]',
      pages: [
        { kicker: '1990 – 2002', title: 'Thời kỳ bứt phá hội nhập',
          html: '<p>Từ thập niên 1990, thành phố đẩy mạnh thu hút đầu tư và hội nhập quốc tế. Các dấu mốc tiêu biểu gồm:</p><ul class="tl"><li><b>1993</b><span>Phú Mỹ Hưng</span></li><li><b>1995</b><span>Gia nhập ASEAN</span></li><li><b>2000</b><span>Trung tâm Giao dịch Chứng khoán</span></li><li><b>2002</b><span>Khu Công nghệ cao</span></li></ul><p>Đây là giai đoạn chuyển mình sang kinh tế thị trường và mở rộng hợp tác quốc tế.</p>' },
        { kicker: '2011 – 2025', title: 'Diện mạo đô thị đổi thay',
          html: '<ul class="tl"><li><b>2011</b><span>Đại lộ Đông – Tây và hầm Thủ Thiêm thông xe</span></li><li><b>2018</b><span>Landmark 81 hoàn thành</span></li><li><b>2021</b><span>TP. Thủ Đức được thành lập</span></li><li><b>Cuối 2024</b><span>Tuyến metro số 1 Bến Thành – Suối Tiên vận hành thương mại</span></li></ul><p>Metro mở ra hướng phát triển mới cho giao thông đô thị.</p>' },
        { kicker: 'Từ 2025', title: 'Mở rộng không gian phát triển',
          html: '<p>Năm 2025, TP. Hồ Chí Minh sáp nhập với Bình Dương và Bà Rịa – Vũng Tàu, mở rộng không gian phát triển theo hướng đa trung tâm.</p><p>Thành phố đặt mục tiêu GRDP bình quân đầu người đạt khoảng:</p><div class="stats"><div><b>13.000</b><span>USD vào năm 2030</span></div><div><b>37.000</b><span>USD vào năm 2045</span></div></div>' }
      ] },
    { no: '3', name: 'Đời sống văn hóa, xã hội', period: 'Xưa và nay', lede: 'Nơi hội tụ của nhiều cộng đồng và nhiều dòng chảy văn hóa.',
      img: 'culture', alt: 'Ảnh đời sống văn hóa – xã hội Sài Gòn', cap: 'Nhà thờ Đức Bà · [nguồn: vietgoing.com]',
      pages: [
        { kicker: 'Cộng đồng và lối sống', title: 'Đô thị đa văn hóa',
          html: '<p>Qua nhiều giai đoạn nhập cư và giao lưu, Sài Gòn – TP. Hồ Chí Minh trở thành nơi hội tụ của nhiều cộng đồng: người Việt, người Hoa, người Khmer, người Chăm cùng cư dân từ khắp các vùng miền.</p><p>Sự đa dạng ấy tạo nên đời sống cởi mở, thể hiện trong ẩm thực, lễ hội, tín ngưỡng và nếp sống thường ngày. Giai đoạn 1954 – 1975, báo chí, nghệ thuật và giải trí phát triển mạnh, làm phong phú thêm đời sống tinh thần của thành phố.</p>' },
        { kicker: 'Không gian văn hóa', title: 'Di sản và điểm hẹn của người dân',
          html: '<p>Nhiều công trình từ thời kỳ đầu đô thị hóa vẫn là biểu tượng của thành phố:</p><ul class="bul"><li><b>Nhà thờ Đức Bà</b> — xây dựng 1863 – 1880</li><li><b>Bưu điện Trung tâm</b> — hoàn thành năm 1891</li><li><b>Nhà hát Thành phố</b> — khánh thành năm 1900</li><li><b>Chợ Bến Thành</b> — khánh thành năm 1914</li></ul><p>Các không gian mới như phố đi bộ Nguyễn Huệ (2015) hay Đường sách TP.HCM (2016) tiếp nối nhu cầu sinh hoạt văn hóa của người dân.</p>' },
        { kicker: 'Nghệ thuật và tri thức', title: 'Tinh thần Nam Bộ giữa đô thị hiện đại',
          html: '<p>Thành phố là nơi phát triển mạnh nhiều loại hình nghệ thuật Nam Bộ, tiêu biểu là cải lương. Năm 2013, Đờn ca tài tử Nam Bộ được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại.</p><p>Lễ hội Áo dài (từ năm 2014) góp phần lan tỏa vẻ đẹp trang phục truyền thống, còn Đại học Quốc gia TP.HCM (thành lập năm 1995) là một trung tâm đào tạo và nghiên cứu lớn của thành phố.</p>' }
      ] },
    { no: '4', name: 'Khoa học, kỹ thuật', period: '1864 – 2025', lede: 'Từ những thiết chế khoa học đầu tiên đến hạ tầng của đô thị hiện đại.',
      img: 'bookScience', alt: 'Ảnh khoa học – kỹ thuật và hạ tầng đô thị', cap: 'Tuyến metro số 1 · [nguồn: Báo Thanh Niên]',
      pages: [
        { kicker: 'Từ thế kỷ XIX', title: 'Những nền móng đầu tiên',
          html: '<p>Sài Gòn sớm có những thiết chế khoa học – kỹ thuật quan trọng như Thảo Cầm Viên (1864) và Viện Pasteur Sài Gòn (1891), do bác sĩ Albert Calmette sáng lập, một cơ sở nghiên cứu y học – vi sinh quan trọng của khu vực.</p><p>Cùng với cầu đường, bến cảng và bưu điện, những công trình ấy cho thấy thành phố sớm là đầu mối giao thương và tri thức.</p>' },
        { kicker: 'Thời kỳ Đổi mới', title: 'Khu công nghiệp và công nghệ cao',
          html: '<p>Từ sau Đổi mới, khoa học – công nghệ gắn chặt với thu hút đầu tư và phát triển công nghiệp:</p><ul class="tl"><li><b>1991</b><span>Khu chế xuất Tân Thuận</span></li><li><b>2000</b><span>Công viên Phần mềm Quang Trung</span></li><li><b>2000</b><span>Trung tâm Giao dịch Chứng khoán</span></li><li><b>2002</b><span>Khu Công nghệ cao</span></li></ul>' },
        { kicker: '2011 – 2025', title: 'Hạ tầng của đô thị hiện đại',
          html: '<p>Hầm Thủ Thiêm và Đại lộ Đông – Tây (2011) kết nối trung tâm thành phố với khu Thủ Thiêm; Landmark 81 (2018) cao hơn 460 m, trở thành biểu tượng mới của đường chân trời thành phố.</p><p>Cuối năm 2024, tuyến metro số 1 Bến Thành – Suối Tiên dài khoảng 19,7 km, gồm 14 nhà ga, bắt đầu vận hành thương mại, mở ra một cách di chuyển mới cho người dân.</p>' }
      ] }
  ],
  closingTitle: 'Lời kết',
  closingText: '<p>Năm mươi năm là quãng đường đủ dài để một thành phố đi từ những ngày gian khó sau chiến tranh đến vị thế đầu tàu kinh tế của cả nước. Nhưng điều làm nên Sài Gòn – TP. Hồ Chí Minh không chỉ là những con số: đó là sự năng động, cởi mở và nghĩa tình của người dân qua từng thời kỳ.</p><p>Hiểu lịch sử là cách để chúng ta trân trọng hôm nay và tự tin bước tiếp, vì thành phố vẫn đang viết tiếp những trang mới.</p>',
  sources: '<ul class="bul"><li>Sách giáo khoa Lịch sử 10</li><li>Báo Chính phủ (baochinhphu.vn)</li><li>Báo Sài Gòn Giải Phóng (sggp.org.vn)</li><li>UNESCO — Danh sách Di sản văn hóa phi vật thể (Đờn ca tài tử Nam Bộ)</li></ul>'
};

/* ---------- 2. ẢNH ---------- */
function bindImages(root) {
  root.querySelectorAll('img[data-key]').forEach(img => {
    const holder = img.closest('.ph');
    img.addEventListener('error', () => holder && holder.classList.add('is-missing'), { once: true });
    img.src = IMAGES[img.dataset.key] || '';
  });
}

/* ---------- 3. SÁCH ----------
   Trạng thái: closed → opening → open → closing → closed. Mọi thao tác ngoài trạng thái hợp lệ đều bị bỏ qua,
   nên click nhanh liên tục không làm kẹt. StPageFlip chỉ được tạo MỘT lần, chuyển động lật trang do thư viện lo. */
const $ = id => document.getElementById(id);
const wrap = $('bookWrap'), stageEl = $('bookStage'), ctrlEl = $('bookCtrl'), coverArt = $('coverArt');
const noMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const OPEN_MS = noMotion ? 50 : 1050, CLOSE_MS = noMotion ? 50 : 1000;   // khớp thời gian CSS (mục 10)
const FIRST_PAGE = 1;      // chỉ số trang Mục lục (bìa = 0)
let book = null, bookState = 'closed', stateTimer = 0;
const onState = [];        // nơi các module khác (chuyển động con trỏ) đăng ký nghe đổi trạng thái

function setState(s) {
  bookState = s; wrap.dataset.state = s;
  const open = s === 'open';
  ctrlEl.inert = !open; stageEl.inert = !open;
  stageEl.setAttribute('aria-hidden', String(!open));
  coverArt.tabIndex = s === 'closed' ? 0 : -1;
  coverArt.setAttribute('aria-hidden', String(s !== 'closed'));
  onState.forEach(fn => fn(s));
}

function buildPages() {
  const el = $('flipbook');
  const pages = [];
  const page = (cls, html, hard) => {
    const d = document.createElement('div');
    d.className = 'page ' + cls;
    if (hard) d.dataset.density = 'hard';
    d.innerHTML = `<div class="page-in">${html}</div>`;
    pages.push(d);
  };
  // Số trang bắt đầu của từng phần (bìa = tr.1, Mục lục = tr.2, Lời đề từ = tr.3, chương 1 bắt đầu ở tr.4)
  let n = 4;
  BOOK.chapters.forEach(c => { c.start = n; n += 1 + c.pages.length; });
  const closingStart = n;
  const sec = p => `<p class="cap">${p.kicker}</p><h3 class="pg-h">${p.title}</h3>${p.html}`;

  page('cover', `<em>Digital Heritage Archive</em><h4>${BOOK.coverTitle}</h4><em>${BOOK.coverSub}</em>`, true);
  // Mục lục (trang nội dung đầu tiên) + Lời đề từ
  page('', `<h4>Mục lục</h4><ul class="toc">${BOOK.chapters.map(c => `<li><span>${c.no}. ${c.name}</span><i>tr. ${c.start}</i></li>`).join('')}
    <li><span>${BOOK.closingTitle}</span><i>tr. ${closingStart}</i></li><li><span>Nguồn tư liệu</span><i>tr. ${closingStart + 1}</i></li></ul>`);
  page('right', `<p class="cap">Mở đầu</p><h3 class="pg-h">Lời đề từ</h3><p class="lede">${BOOK.epigraph}</p>`);
  // Mỗi chương: trang mở chương (trái) + các trang nội dung (phải, trái, phải…)
  BOOK.chapters.forEach(c => {
    page('', `<span class="ch">${c.no}</span><h4>${c.name}</h4><p class="cap">${c.period}</p><p class="lede">${c.lede}</p>
      <div class="ph" data-label="${c.alt}"><img data-key="${c.img}" alt="${c.alt}"></div><p class="cap">${c.cap}</p>`);
    c.pages.forEach((p, i) => page(i % 2 === 0 ? 'right' : '', sec(p)));
  });
  // 2 trang kết
  page('', `<p class="cap">Khép lại</p><h3 class="pg-h">${BOOK.closingTitle}</h3>${BOOK.closingText}`);
  page('right', `<p class="cap">Tư liệu</p><h3 class="pg-h">Nguồn tư liệu</h3>${BOOK.sources}`);
  // Bìa sau
  page('cover', `<em>Hòn Ngọc Viễn Đông</em>`, true);
  if (pages.length % 2) console.warn('Tổng số trang phải là số chẵn: hãy kiểm tra số trang nội dung mỗi chương (phải lẻ).');

  // đánh số trang
  pages.forEach((p, i) => {
    if (!p.classList.contains('cover')) p.firstChild.insertAdjacentHTML('beforeend', `<span class="num">${i + 1}</span>`);
    el.appendChild(p);
  });
  bindImages(el);
  return pages;
}

function updateIndicator() {
  if (!book) return;
  const i = book.getCurrentPageIndex(), n = book.getPageCount();
  const spread = typeof book.getOrientation === 'function' && book.getOrientation() === 'landscape' && i > 0 && i + 1 < n;
  $('pageNum').textContent = spread ? `Trang ${i + 1}–${i + 2} / ${n}` : `Trang ${i + 1} / ${n}`;
}

function initBook() {
  if (book) return true;                         // tránh tạo trùng
  if (!window.St || !St.PageFlip) { $('bookFail').hidden = false; return false; }
  const pages = buildPages();
  book = new St.PageFlip($('flipbook'), {
    width: 460, height: 640,                     // tỉ lệ 1 trang
    size: 'stretch',
    minWidth: 260, maxWidth: 560, minHeight: 360, maxHeight: 780,
    showCover: true,
    startPage: FIRST_PAGE,                       // mở ra là thấy Mục lục
    usePortrait: false,                          // luôn hiển thị 2 trang
    mobileScrollSupport: true,
    maxShadowOpacity: 0.45,
    flippingTime: MOTION.flipTime,
    swipeDistance: 30,
    disableFlipByClick: false                    // nhấp vào trang để lật
  });
  book.loadFromHTML(pages);
  book.on('flip', e => {
    updateIndicator();
    if (e.data === 0 && bookState === 'open') closeBook();   // kéo lùi qua Mục lục = gập sách lại
  });
  updateIndicator();
  return true;
}

function openBook() {
  if (bookState !== 'closed') return;
  if (!initBook()) return;                       // thiếu thư viện → hiện thông báo, bìa vẫn còn
  clearTimeout(stateTimer);
  setState('opening');
  stateTimer = setTimeout(() => {
    setState('open'); updateIndicator();
    $('closeBook').focus({ preventScroll: true });
  }, OPEN_MS);
}

function closeBook() {
  if (bookState !== 'open') return;
  clearTimeout(stateTimer);
  setState('closing');
  stateTimer = setTimeout(() => {
    if (book) { book.turnToPage(FIRST_PAGE); updateIndicator(); }   // reset khi sách đã ẩn
    setState('closed');
    coverArt.focus({ preventScroll: true });
  }, CLOSE_MS);
}

// Mỗi listener chỉ gắn một lần
coverArt.addEventListener('click', openBook);                       // chuột + chạm
coverArt.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(); }
});
$('closeBook').addEventListener('click', closeBook);
wrap.addEventListener('keydown', e => {
  if (bookState !== 'open' || !book) return;
  if (e.key === 'ArrowRight') book.flipNext();
  else if (e.key === 'ArrowLeft') book.flipPrev();
  else if (e.key === 'Escape') closeBook();
});
if (!window.St) $('bookFail').hidden = false;    // thư viện không tải được
setState('closed');

/* ---------- 4. HỆ THỐNG CHUYỂN ĐỘNG ----------
   Một vòng requestAnimationFrame duy nhất, chỉ chạy khi còn gì đang chuyển động.
   Dùng thuộc tính CSS riêng lẻ (translate / rotate / scale) nên không đè lên `transform` của hiệu ứng hiện ra.
   Không dùng GSAP: nội suy + IntersectionObserver là đủ, trang giữ được nhẹ. */
bindImages(document);
const root = document.documentElement, body = document.body;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced;
root.style.setProperty('--stagger', MOTION.stagger + 'ms');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* 4A. Hiện dần theo thứ bậc: tiêu đề → chữ phụ → ảnh. Phần tử vào cùng lúc được trễ lần lượt. */
const revealIO = new IntersectionObserver(es => {
  let k = 0;
  es.filter(e => e.isIntersecting).forEach(e => {
    e.target.style.setProperty('--rd', (k++ * MOTION.stagger) + 'ms');
    e.target.classList.add('in');
    if (e.target === wrap) initBook();            // tái dùng observer: chuẩn bị sách khi sắp tới
    revealIO.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

// Tiêu đề lớn: tách theo dòng (mặt nạ trượt lên). Văn bản vẫn nguyên vẹn, bôi chọn được.
document.querySelectorAll('.big').forEach(h => {
  h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i)
    .map((t, i) => `<span class="ln"><span style="--i:${i}">${t.trim()}</span></span>`).join('');
  h.classList.remove('reveal'); h.classList.add('split'); revealIO.observe(h);
});
// Câu kết: tách theo từ
const st = document.querySelector('.statement');
if (st) {
  st.innerHTML = st.textContent.trim().split(/\s+/)
    .map((w, i) => `<span class="w" style="--i:${Math.min(i, 24)}">${w}</span>`).join(' ');
  st.classList.remove('reveal'); st.classList.add('words'); revealIO.observe(st);
}
wrap.classList.add('reveal', 'reveal-book');   // sách hiện vào nhẹ nhàng
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

// Các khối sáng ambient (trang trí, nằm sau nội dung)
[['.history', -.1, 'top:-6%;right:-12%'], ['.book-sec', .08, 'top:20%;left:-14%'],
 ['.culture', -.08, 'bottom:-10%;right:-10%'], ['.tech', .1, 'top:10%;left:-12%']].forEach(([sel, sp, pos]) => {
  const b = document.createElement('i');
  b.className = 'blob'; b.dataset.parallax = sp; b.style.cssText = pos; b.setAttribute('aria-hidden', 'true');
  document.querySelector(sel).prepend(b);
});

/* 4B. Lõi nội suy (spring đơn giản): mỗi spring có đích (tx,ty) và giá trị hiện tại (x,y). */
const springs = [];
function makeSpring(apply, ease) { const s = { apply, ease, x: 0, y: 0, tx: 0, ty: 0 }; springs.push(s); return s; }
const cache = {};
function getSpring(kind, el, make) {
  const m = cache[kind] || (cache[kind] = new WeakMap());
  let s = m.get(el); if (!s) m.set(el, s = make(el)); return s;
}
let raf = 0, last = 0;
const P = { x: 0, y: 0, nx: 0, ny: 0, target: null, dirty: false, seen: false, out: true };
const S = { dirty: true };
function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
function frame(now) {
  raf = 0;
  const dt = Math.min(now - last, 48) || 16; last = now;
  if (P.dirty) { P.dirty = false; process(); }      // đọc layout trước…
  if (S.dirty) { S.dirty = false; scrollTargets(); }
  let busy = false;
  for (const s of springs) {                        // …rồi mới ghi
    const dx = s.tx - s.x, dy = s.ty - s.y;
    if (Math.abs(dx) < .0008 && Math.abs(dy) < .0008) { if (dx || dy) { s.x = s.tx; s.y = s.ty; s.apply(s); } continue; }
    const k = 1 - Math.pow(1 - s.ease, dt / 16.67);
    s.x += dx * k; s.y += dy * k; s.apply(s); busy = true;
  }
  if (busy) raf = requestAnimationFrame(frame);
}

/* 4C. Cuộn: tiến trình, parallax, mục đang xem, thanh trượt nav */
const topBtn = $('toTop'), bar = $('progress'), links = [...document.querySelectorAll('#menu a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const menuEl = $('menu'), pill = document.createElement('i');
pill.className = 'pill'; pill.setAttribute('aria-hidden', 'true'); menuEl.appendChild(pill);
let activeIdx = -1;
function movePill() {
  const a = links[activeIdx];
  if (!a || innerWidth <= 900) { pill.style.opacity = 0; return; }
  pill.style.opacity = 1;
  pill.style.setProperty('--x', a.offsetLeft + 'px'); pill.style.setProperty('--w', a.offsetWidth + 'px');
}
const prog = makeSpring(s => { bar.style.transform = `scaleX(${s.x.toFixed(4)})`; }, 0.2);
const par = reduced ? [] : [...document.querySelectorAll('[data-parallax]')].map(el => {
  const s = makeSpring(s => { el.style.translate = `0 ${s.y.toFixed(1)}px`; }, MOTION.scrollEase);
  s.el = el; s.sp = Number(el.dataset.parallax); return s;
});
function scrollTargets() {
  const vh = innerHeight, h = root.scrollHeight - vh;
  prog.tx = h > 0 ? clamp(scrollY / h, 0, 1) : 0;
  topBtn.classList.toggle('show', scrollY > vh * .8);
  par.forEach(s => {
    const r = s.el.getBoundingClientRect();
    if (r.bottom < -400 || r.top > vh + 400) return;
    s.ty = (r.top + r.height / 2 - s.y - vh / 2) * -s.sp;   // trừ phần đã dịch để không tự phản hồi
  });
  let idx = -1;
  sections.forEach((sec, i) => { const r = sec.getBoundingClientRect(); if (r.top < vh * .4 && r.bottom > vh * .4) idx = i; });
  if (idx !== activeIdx) {
    activeIdx = idx;
    links.forEach((a, i) => { a.classList.toggle('active', i === idx); i === idx ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
    movePill();
  }
}
addEventListener('scroll', () => { S.dirty = true; kick(); }, { passive: true });
addEventListener('resize', () => { S.dirty = true; movePill(); kick(); }, { passive: true });
scrollTargets(); S.dirty = false;
[prog, ...par].forEach(s => { s.x = s.tx; s.y = s.ty; s.apply(s); });
if (document.fonts) document.fonts.ready.then(movePill);

/* 4D. Con trỏ: chiều sâu, nghiêng, ánh sáng trên kính, dịch ảnh, nút hút, vòng con trỏ (chỉ khi có chuột) */
const TILT = '.card,.note', GLOW = '.glass,.cover-art';
const layers = [...document.querySelectorAll('[data-depth]')].map(el => {
  const s = makeSpring(s => { el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`; }, MOTION.ease);
  s.d = Number(el.dataset.depth); return s;
});
let ring, dot;
const cur = {};
function track(kind, next, make, set, reset = true) {
  const prev = cur[kind];
  if (prev && prev !== next && reset) { const s = getSpring(kind, prev, make); s.tx = s.ty = 0; }
  cur[kind] = next;
  if (next) { const s = getSpring(kind, next, make); set(s, next.getBoundingClientRect()); if (!s.init) { s.x = s.tx; s.y = s.ty; s.init = 1; } }
}
const mkTilt = el => makeSpring(s => {
  const m = Math.hypot(s.x, s.y);
  el.style.rotate = m < .002 ? 'none' : `${-s.y} ${s.x} 0 ${(m * 2 * MOTION.tilt).toFixed(2)}deg`;
}, MOTION.ease);
const mkGlow = el => makeSpring(s => { el.style.setProperty('--lx', s.x.toFixed(1) + '%'); el.style.setProperty('--ly', s.y.toFixed(1) + '%'); }, .14);
const mkImg = el => { const img = el.querySelector('img'); return makeSpring(s => { img.style.setProperty('--ix', s.x.toFixed(2) + 'px'); img.style.setProperty('--iy', s.y.toFixed(2) + 'px'); }, MOTION.ease * .8); };
const mkBtn = el => makeSpring(s => { el.style.setProperty('--bx', s.x.toFixed(2) + 'px'); el.style.setProperty('--by', s.y.toFixed(2) + 'px'); }, MOTION.ease + .05);

// Bìa sách phản hồi khi con trỏ TIẾN GẦN (không cần chạm vào), nghiêng nhẹ có giới hạn, trả về mềm mại khi rời đi
const coverS = makeSpring(s => {
  const m = Math.hypot(s.x, s.y);
  coverArt.style.rotate = m < .002 ? 'none' : `${-s.y} ${s.x} 0 ${(m * 2 * MOTION.coverTilt).toFixed(2)}deg`;
  coverArt.style.setProperty('--sx', (-s.x * 28).toFixed(1)); coverArt.style.setProperty('--sy', (-s.y * 28).toFixed(1));
}, MOTION.ease * .8);
function coverTrack() {
  if (bookState !== 'closed' || P.out || !MOTION.coverTilt) { coverS.tx = coverS.ty = 0; return; }
  const r = coverArt.getBoundingClientRect(), dx = P.x - (r.left + r.width / 2), dy = P.y - (r.top + r.height / 2);
  const edge = Math.hypot(Math.max(Math.abs(dx) - r.width / 2, 0), Math.max(Math.abs(dy) - r.height / 2, 0));
  let w = clamp(1 - edge / (r.height * .7), 0, 1); w = w * w * (3 - 2 * w);        // vùng ảnh hưởng mềm
  coverS.tx = clamp(dx / r.width, -.5, .5) * w; coverS.ty = clamp(dy / r.height, -.5, .5) * w;
}
onState.push(st => { if (st !== 'closed') { coverS.tx = coverS.ty = 0; kick(); } });

function process() {
  const t = P.target instanceof Element ? P.target : null;
  layers.forEach(s => { s.tx = P.nx * s.d; s.ty = P.ny * s.d; });
  body.classList.toggle('c-out', P.out);
  coverTrack();
  if (!P.out && ring) {
    ring.tx = dot.tx = P.x; ring.ty = dot.ty = P.y;
    if (!P.seen) { P.seen = true; ring.x = dot.x = P.x; ring.y = dot.y = P.y; body.classList.add('c-on'); }
  }
  const stage = t && t.closest('.book-stage');       // trong vùng sách: không can thiệp gì cả
  body.classList.toggle('c-link', !!(t && t.closest('a,button,[role="button"]')));
  body.classList.toggle('c-stage', !!stage);
  const q = sel => (t && !stage ? t.closest(sel) : null);
  const btn = q('.btn');
  track('tilt', MOTION.tilt ? q(TILT) : null, mkTilt, (s, r) => { s.tx = (P.x - r.left) / r.width - .5; s.ty = (P.y - r.top) / r.height - .5; });
  track('glow', q(GLOW), mkGlow, (s, r) => { s.tx = (P.x - r.left) / r.width * 100; s.ty = (P.y - r.top) / r.height * 100; }, false);
  track('img', MOTION.imgShift ? q('figure.ph') : null, mkImg, (s, r) => {
    s.tx = -((P.x - r.left) / r.width - .5) * MOTION.imgShift * 2; s.ty = -((P.y - r.top) / r.height - .5) * MOTION.imgShift * 2;
  });
  track('btn', MOTION.magnet && btn && !btn.disabled ? btn : null, mkBtn, (s, r) => {
    s.tx = clamp((P.x - r.left - r.width / 2) * .22, -MOTION.magnet, MOTION.magnet);
    s.ty = clamp((P.y - r.top - r.height / 2) * .22, -MOTION.magnet, MOTION.magnet);
  });
}
if (fine) {
  ring = makeSpring(s => { ringEl.style.translate = `${s.x.toFixed(1)}px ${s.y.toFixed(1)}px`; }, MOTION.ringEase);
  dot = makeSpring(s => { dotEl.style.translate = `${s.x.toFixed(1)}px ${s.y.toFixed(1)}px`; }, .6);
  var ringEl = Object.assign(document.createElement('div'), { className: 'cursor' });
  var dotEl = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
  ringEl.setAttribute('aria-hidden', 'true'); dotEl.setAttribute('aria-hidden', 'true');
  body.append(ringEl, dotEl);
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    P.x = e.clientX; P.y = e.clientY; P.nx = P.x / innerWidth - .5; P.ny = P.y / innerHeight - .5;
    P.target = e.target; P.out = false; P.dirty = true; kick();
  }, { passive: true });
  root.addEventListener('mouseleave', () => { P.out = true; P.target = null; P.nx = P.ny = 0; P.dirty = true; kick(); });
}

/* 4E. CUỘN MƯỢT (Lenis). Không có thư viện / bật "giảm chuyển động" → tự dùng cuộn thường của trình duyệt. */
let lenis = null;
if (window.Lenis && !reduced) {
  lenis = new Lenis({ lerp: MOTION.smoothScroll, smoothWheel: true });   // cảm ứng giữ nguyên cuộn gốc
  const tick = t => { lenis.raf(t); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
const goTo = (target, offset = -70) => lenis
  ? lenis.scrollTo(target, { offset, duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) })
  : (target === 0 ? scrollTo({ top: 0, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
document.addEventListener('click', e => {                                  // mọi liên kết #neo đều cuộn mượt
  const a = e.target.closest('a[href^="#"]'); if (!a || !lenis) return;
  const id = a.getAttribute('href'), t = id.length > 1 ? document.querySelector(id) : null;
  if (id.length > 1 && !t) return;
  e.preventDefault(); goTo(t || 0);
});
topBtn.addEventListener('click', () => goTo(0));

// Menu di động
const toggle = $('navToggle'), menu = $('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
kick();
