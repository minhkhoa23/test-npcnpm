import { loadTranslations } from '../lang.js';
import { apiCall } from '../api.js';

export async function renderGuestView() {
  document.body.innerHTML = `
    <!-- Header Navigation -->
    <header class="main-header">
      <div class="header-container">
        <div class="header-left">
          <div class="nav-item">
            <svg class="nav-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M15 36.6667V20H25V36.6667M5 15L20 3.33334L35 15V33.3333C35 34.2174 34.6488 35.0652 34.0237 35.6904C33.3986 36.3155 32.5507 36.6667 31.6667 36.6667H8.33333C7.44928 36.6667 6.60143 36.3155 5.97631 35.6904C5.35119 35.0652 5 34.2174 5 33.3333V15Z" stroke="#F5F5F5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="nav-text">Trang chủ</span>
          </div>
          <div class="search-container">
            <input type="text" id="searchGuestBar" placeholder="Tìm kiếm giải đấu..." class="search-input">
            <svg class="search-close" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="header-center">
          <div class="nav-item">
            <svg class="nav-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M15.15 15C15.5419 13.8861 16.3153 12.9469 17.3333 12.3486C18.3513 11.7503 19.5482 11.5316 20.712 11.7312C21.8758 11.9308 22.9314 12.5359 23.6918 13.4392C24.4522 14.3426 24.8684 15.4859 24.8667 16.6667C24.8667 20 19.8667 21.6667 19.8667 21.6667M20 28.3333H20.0167M36.6667 20C36.6667 29.2048 29.2048 36.6667 20 36.6667C10.7953 36.6667 3.33334 29.2048 3.33334 20C3.33334 10.7953 10.7953 3.33334 20 3.33334C29.2048 3.33334 36.6667 10.7953 36.6667 20Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="nav-text">Hỗ trợ</span>
          </div>
          <div class="nav-item">
            <svg class="nav-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 26.6667V20M20 13.3333H20.0167M36.6667 20C36.6667 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33333 29.2048 3.33333 20C3.33333 10.7953 10.7952 3.33334 20 3.33334C29.2047 3.33334 36.6667 10.7953 36.6667 20Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="nav-text">Thông tin</span>
          </div>
        </div>
        <div class="header-right">
          <button id="loginGuestBtn" class="auth-btn login-btn">
            <svg class="auth-icon" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <path d="M21.875 4.375H27.7083C28.4819 4.375 29.2237 4.68229 29.7707 5.22927C30.3177 5.77625 30.625 6.51812 30.625 7.29167V27.7083C30.625 28.4819 30.3177 29.2237 29.7707 29.7707C29.2237 30.3177 28.4819 30.625 27.7083 30.625H21.875M14.5833 24.7917L21.875 17.5M21.875 17.5L14.5833 10.2083M21.875 17.5H4.375" stroke="#303030" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Đăng nhập
          </button>
          <button id="registerGuestBtn" class="auth-btn register-btn">
            <svg class="auth-icon" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <path d="M17.5 10.2083C17.5 8.66124 16.8854 7.17751 15.7914 6.08354C14.6975 4.98958 13.2138 4.375 11.6667 4.375H2.91666V26.25H13.125C14.2853 26.25 15.3981 26.7109 16.2186 27.5314C17.0391 28.3519 17.5 29.4647 17.5 30.625M17.5 10.2083V30.625M17.5 10.2083C17.5 8.66124 18.1146 7.17751 19.2085 6.08354C20.3025 4.98958 21.7862 4.375 23.3333 4.375H32.0833V26.25H21.875C20.7147 26.25 19.6019 26.7109 18.7814 27.5314C17.9609 28.3519 17.5 29.4647 17.5 30.625" stroke="#2C2C2C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Đăng ký
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Hero Section with Tournament Carousel -->
      <section class="hero-section">
        <div class="hero-container">
          <h1 class="hero-title">Các giải đấu đang diễn ra</h1>
          <div class="tournament-carousel">
            <button class="carousel-btn prev-btn">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M38 24H10M10 24L24 38M10 24L24 10" stroke="#F19EDC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div id="tournamentCarousel" class="carousel-content">
              <div class="loading-placeholder">Loading tournaments...</div>
            </div>
            <button class="carousel-btn next-btn">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M10 24H38M38 24L24 10M38 24L24 38" stroke="#F19EDC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- News Section -->
      <section class="news-section">
        <div class="section-container">
          <div class="section-header">
            <h2 class="section-title">TIN TỨC MỚI NHẤT</h2>
            <button class="search-btn">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M35 35L27.75 27.75M31.6667 18.3333C31.6667 25.6971 25.6971 31.6667 18.3333 31.6667C10.9695 31.6667 5 25.6971 5 18.3333C5 10.9695 10.9695 5 18.3333 5C25.6971 5 31.6667 10.9695 31.6667 18.3333Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="news-carousel">
            <button class="news-nav-btn news-prev-btn">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M38 24H10M10 24L24 38M10 24L24 10" stroke="#F19EDC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="news-container">
              <div id="newsList" class="news-grid">
                <div class="loading-placeholder">Loading news...</div>
              </div>
            </div>
            <button class="news-nav-btn news-next-btn">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M10 24H38M38 24L24 10M38 24L24 38" stroke="#F19EDC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Highlights Section -->
      <section class="highlights-section">
        <div class="section-container">
          <h2 class="section-title highlight-title">HIGHLIGHT NÓNG THỔI</h2>
          <div class="highlights-content">
            <div class="highlights-list">
              <div id="highlightsList">
                <div class="loading-placeholder">Loading highlights...</div>
              </div>
            </div>
            <div class="featured-highlight">
              <div id="featuredHighlight" class="featured-video">
                <div class="video-placeholder">Select a highlight to play</div>
              </div>
              <div class="video-controls">
                <button class="control-btn">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 26.6667V20M20 13.3334H20.0167M36.6667 20C36.6667 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33333 29.2048 3.33333 20C3.33333 10.7953 10.7952 3.33337 20 3.33337C29.2047 3.33337 36.6667 10.7953 36.6667 20Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="control-btn">
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <path d="M11.9167 39V13H16.25V39H11.9167ZM40.0833 39L20.5833 26L40.0833 13V39ZM35.75 30.875V21.125L28.3833 26L35.75 30.875Z" fill="#FEF7FF"/>
                  </svg>
                </button>
                <button class="control-btn play-btn">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M10 6L38 24L10 42V6Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="control-btn">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M20 8H12V40H20V8Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M36 8H28V40H36V8Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="control-btn">
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <path d="M35.75 39V13H40.0833V39H35.75ZM11.9167 39V13L31.4167 26L11.9167 39ZM16.25 30.875L23.6167 26L16.25 21.125V30.875Z" fill="#FEF7FF"/>
                  </svg>
                </button>
                <button class="control-btn">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M17.18 27.02L30.84 34.98M30.82 13.02L17.18 20.98M42 10C42 13.3137 39.3137 16 36 16C32.6863 16 30 13.3137 30 10C30 6.68629 32.6863 4 36 4C39.3137 4 42 6.68629 42 10ZM18 24C18 27.3137 15.3137 30 12 30C8.68629 30 6 27.3137 6 24C6 20.6863 8.68629 18 12 18C15.3137 18 18 20.6863 18 24ZM42 38C42 41.3137 39.3137 44 36 44C32.6863 44 30 41.3137 30 38C30 34.6863 32.6863 32 36 32C39.3137 32 42 34.6863 42 38Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="video-progress">
                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill"></div>
                    <div class="progress-handle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="cta-section">
        <div class="section-container">
          <h2 class="cta-title">MUỐN TỔ CHỨC GIẢI ĐẤU, HÃY THAM GIA VỚI CHÚNG TÔI</h2>
          <p class="cta-description">Tổ chức giải đấu, chọn thể lệ, quản lý giải đấu và nhiều hơn thế nữa ...</p>
          <div class="cta-buttons">
            <button id="ctaLoginBtn" class="cta-btn login">
              Đăng nhập
            </button>
            <button id="ctaRegisterBtn" class="cta-btn register">
              Đăng ký
            </button>
          </div>
          <div class="cta-thumbnails">
            <div class="thumbnail-item"></div>
            <div class="thumbnail-item"></div>
            <div class="thumbnail-item"></div>
            <div class="thumbnail-item"></div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section contact">
            <h3>Liên hệ với chúng tôi:</h3>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <g clip-path="url(#clip0_14_1455)">
                    <path d="M45.08 12.84C44.8424 11.8908 44.3586 11.0211 43.6773 10.3188C42.996 9.61648 42.1415 9.10637 41.2 8.84C37.76 8 24 8 24 8C24 8 10.24 8 6.79998 8.92C5.85848 9.18637 5.00394 9.69648 4.32268 10.3988C3.64142 11.1011 3.15756 11.9708 2.91998 12.92C2.29041 16.4111 1.98246 19.9526 1.99998 23.5C1.97754 27.0741 2.28552 30.6426 2.91998 34.16C3.1819 35.0797 3.6766 35.9163 4.35627 36.589C5.03595 37.2616 5.87762 37.7476 6.79998 38C10.24 38.92 24 38.92 24 38.92C24 38.92 37.76 38.92 41.2 38C42.1415 37.7336 42.996 37.2235 43.6773 36.5212C44.3586 35.8189 44.8424 34.9492 45.08 34C45.7047 30.5352 46.0126 27.0207 46 23.5C46.0224 19.9259 45.7145 16.3574 45.08 12.84Z" stroke="#F5F5F5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.5 30.04L31 23.5L19.5 16.96V30.04Z" stroke="#F5F5F5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M35 13H35.02M14 4H34C39.5228 4 44 8.47715 44 14V34C44 39.5228 39.5228 44 34 44H14C8.47715 44 4 39.5228 4 34V14C4 8.47715 8.47715 4 14 4ZM32 22.74C32.2468 24.4045 31.9625 26.1044 31.1875 27.598C30.4125 29.0916 29.1863 30.3028 27.6833 31.0593C26.1802 31.8159 24.4769 32.0792 22.8156 31.8119C21.1543 31.5445 19.6195 30.7602 18.4297 29.5703C17.2398 28.3805 16.4555 26.8457 16.1881 25.1844C15.9208 23.5231 16.1841 21.8198 16.9407 20.3167C17.6972 18.8137 18.9084 17.5875 20.402 16.8125C21.8956 16.0375 23.5955 15.7532 25.26 16C26.9578 16.2518 28.5297 17.0429 29.7434 18.2566C30.9571 19.4703 31.7482 21.0422 32 22.74Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M36 4H30C27.3478 4 24.8043 5.05357 22.9289 6.92893C21.0536 8.8043 20 11.3478 20 14V20H14V28H20V44H28V28H34L36 20H28V14C28 13.4696 28.2107 12.9609 28.5858 12.5858C28.9609 12.2107 29.4696 12 30 12H36V4Z" stroke="#F5F5F5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M22 22V14M32 22V14M42 4H6V36H16V44L24 36H34L42 28V4Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
            <p class="contact-email">xxxxx@gmail.com</p>
          </div>
          <div class="footer-section info">
            <div class="info-item">
              <svg class="info-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 26.6667V20M20 13.3334H20.0167M36.6667 20C36.6667 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33333 29.2048 3.33333 20C3.33333 10.7953 10.7952 3.33337 20 3.33337C29.2047 3.33337 36.6667 10.7953 36.6667 20Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Thông tin sử dụng</span>
            </div>
            <div class="info-item">
              <svg class="info-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 26.6667V20M20 13.3334H20.0167M36.6667 20C36.6667 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33333 29.2048 3.33333 20C3.33333 10.7953 10.7952 3.33337 20 3.33337C29.2047 3.33337 36.6667 10.7953 36.6667 20Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Chính sách bảo mật</span>
            </div>
            <div class="info-item">
              <svg class="info-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 26.6667V20M20 13.3334H20.0167M36.6667 20C36.6667 29.2048 29.2047 36.6667 20 36.6667C10.7952 36.6667 3.33333 29.2048 3.33333 20C3.33333 10.7953 10.7952 3.33337 20 3.33337C29.2047 3.33337 36.6667 10.7953 36.6667 20Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Điều khoản sử dụng</span>
            </div>
          </div>
          <div class="footer-section preview">
            <div class="footer-thumbnail"></div>
            <div class="footer-controls">
              <button class="footer-control-btn">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M42 42L33.3 33.3M22 16V28M16 22H28M38 22C38 30.8366 30.8366 38 22 38C13.1634 38 6 30.8366 6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="footer-control-btn">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M42 42L33.3 33.3M16 22H28M38 22C38 30.8366 30.8366 38 22 38C13.1634 38 6 30.8366 6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22Z" stroke="#F3F3F3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="copyright">2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  `;

  const guestController = window.guestController;

  // Gắn sự kiện nút login/register
  if (guestController) {
    document.getElementById('loginGuestBtn')?.addEventListener('click', () => guestController.navigateToLogin());
    document.getElementById('registerGuestBtn')?.addEventListener('click', () => guestController.navigateToRegister());
    document.getElementById('ctaLoginBtn')?.addEventListener('click', () => guestController.navigateToLogin());
    document.getElementById('ctaRegisterBtn')?.addEventListener('click', () => guestController.navigateToRegister());
  }

  loadTranslations('vi'); // Default to Vietnamese

  // Áp dụng lại dark mode nếu đang bật
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // Load dynamic content
  await loadTournaments();
  await loadNews();
  await loadHighlights();
}

async function loadTournaments() {
  try {
    const tournaments = await apiCall('/api/tournaments');
    const tournamentCarousel = document.getElementById('tournamentCarousel');

    if (tournaments.length === 0) {
      tournamentCarousel.innerHTML = '<div class="no-content">No tournaments available</div>';
      return;
    }

    tournamentCarousel.innerHTML = `
      <div class="carousel-slider">
        ${tournaments.map(tournament => `
          <div class="tournament-slide">
            <div class="tournament-card-hero">
              <div class="tournament-image"></div>
              <div class="tournament-info">
                <h3 class="tournament-name">${tournament.name}</h3>
                <p class="tournament-desc">${tournament.description}</p>
                <div class="tournament-badges">
                  <span class="status-badge status-${tournament.status}">${tournament.status}</span>
                  <span class="format-badge">${tournament.format}</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error('Error loading tournaments:', error);
    document.getElementById('tournamentCarousel').innerHTML = '<div class="error-message">Failed to load tournaments</div>';
  }
}

let currentNewsPage = 0;
const newsPerPage = 3;
let allNews = [];

async function loadNews() {
  try {
    const news = await apiCall('/api/news');
    allNews = news;
    const newsList = document.getElementById('newsList');

    if (news.length === 0) {
      newsList.innerHTML = '<div class="no-content">No news available</div>';
      return;
    }

    displayNewsPage(0);
    setupNewsNavigation();
  } catch (error) {
    console.error('Error loading news:', error);
    document.getElementById('newsList').innerHTML = '<div class="error-message">Failed to load news</div>';
  }
}

function displayNewsPage(page) {
  const newsList = document.getElementById('newsList');
  const startIndex = page * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const newsToShow = allNews.slice(startIndex, endIndex);

  if (newsToShow.length === 0) return;

  newsList.innerHTML = newsToShow.map(newsItem => `
    <div class="news-card-new">
      <div class="news-image"></div>
      <div class="news-content-new">
        <h4 class="news-title-new">${newsItem.title}</h4>
        <p class="news-excerpt">${newsItem.content.substring(0, 100)}...</p>
        <div class="news-meta-new">
          <span class="news-date">${new Date(newsItem.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Update button states
  updateNewsNavigationButtons();
}

function setupNewsNavigation() {
  const prevBtn = document.querySelector('.news-prev-btn');
  const nextBtn = document.querySelector('.news-next-btn');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentNewsPage > 0) {
        currentNewsPage--;
        displayNewsPage(currentNewsPage);
      }
    });

    nextBtn.addEventListener('click', () => {
      const maxPage = Math.ceil(allNews.length / newsPerPage) - 1;
      if (currentNewsPage < maxPage) {
        currentNewsPage++;
        displayNewsPage(currentNewsPage);
      }
    });
  }
}

function updateNewsNavigationButtons() {
  const prevBtn = document.querySelector('.news-prev-btn');
  const nextBtn = document.querySelector('.news-next-btn');
  const maxPage = Math.ceil(allNews.length / newsPerPage) - 1;

  if (prevBtn) {
    prevBtn.style.opacity = currentNewsPage > 0 ? '1' : '0.5';
    prevBtn.style.pointerEvents = currentNewsPage > 0 ? 'auto' : 'none';
  }

  if (nextBtn) {
    nextBtn.style.opacity = currentNewsPage < maxPage ? '1' : '0.5';
    nextBtn.style.pointerEvents = currentNewsPage < maxPage ? 'auto' : 'none';
  }
}

async function loadHighlights() {
  try {
    const highlights = await apiCall('/api/highlights');
    const highlightsList = document.getElementById('highlightsList');
    const featuredHighlight = document.getElementById('featuredHighlight');

    if (highlights.length === 0) {
      highlightsList.innerHTML = '<div class="no-content">No highlights available</div>';
      return;
    }

    // Create highlight list items
    highlightsList.innerHTML = highlights.map((highlight, index) => `
      <div class="highlight-item ${index === 0 ? 'active' : ''}" data-video-url="${highlight.videoUrl}" data-index="${index}">
        <div class="highlight-thumbnail"></div>
        <div class="highlight-info">
          <h5 class="highlight-name">${highlight.title}</h5>
          <p class="highlight-desc">${highlight.description}</p>
        </div>
      </div>
    `).join('');

    // Set featured video (first highlight)
    if (highlights.length > 0) {
      featuredHighlight.innerHTML = `
        <div class="video-frame">
          <div class="video-content">
            <h4>${highlights[0].title}</h4>
            <p>${highlights[0].description}</p>
            <a href="${highlights[0].videoUrl}" target="_blank" class="watch-btn">Watch on YouTube</a>
          </div>
        </div>
      `;
    }

    // Add click handlers for highlight items
    document.querySelectorAll('.highlight-item').forEach(item => {
      item.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const highlight = highlights[index];

        // Update active state
        document.querySelectorAll('.highlight-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // Update featured video
        featuredHighlight.innerHTML = `
          <div class="video-frame">
            <div class="video-content">
              <h4>${highlight.title}</h4>
              <p>${highlight.description}</p>
              <a href="${highlight.videoUrl}" target="_blank" class="watch-btn">Watch on YouTube</a>
            </div>
          </div>
        `;
      });
    });

  } catch (error) {
    console.error('Error loading highlights:', error);
    document.getElementById('highlightsList').innerHTML = '<div class="error-message">Failed to load highlights</div>';
  }
}
