import { loadTranslations } from '../lang.js';
import { apiCall } from '../api.js';

export async function renderGuestView() {
  document.body.innerHTML = `
    <header class="guest-header">
      <h1 id="guestTitle">Tournament Manager</h1>
      <nav class="guest-nav">
        <input type="text" id="searchGuestBar" placeholder="Search tournaments...">
        <button id="loginGuestBtn" class="btn">Log In</button>
        <button id="registerGuestBtn" class="btn">Sign Up</button>
        <select id="languageSelect">
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
        <button id="toggleDarkMode" class="btn">🌙 Dark Mode</button>
      </nav>
    </header>

    <main id="guestContent">
      <div class="guest-container">
        <h2>Welcome to Tournament Manager</h2>
        <p>Explore exciting Esports tournaments, teams, and highlights. Log in or sign up to join the action!</p>

        <!-- Current Tournaments Section -->
        <section class="tournaments-section">
          <h3>🏆 Current Tournaments</h3>
          <div id="tournamentsList" class="content-grid">
            <div class="loading-placeholder">Loading tournaments...</div>
          </div>
        </section>

        <!-- Current News Section -->
        <section class="news-section">
          <h3>📰 Latest News</h3>
          <div id="newsList" class="content-grid">
            <div class="loading-placeholder">Loading news...</div>
          </div>
        </section>

        <!-- Highlights Section -->
        <section class="highlights-section">
          <h3>🎬 Recent Highlights</h3>
          <div id="highlightsList" class="content-grid">
            <div class="loading-placeholder">Loading highlights...</div>
          </div>
        </section>
      </div>
    </main>
  `;

  const guestController = window.guestController;

  // Gắn sự kiện nút login/register
  if (guestController) {
    document.getElementById('loginGuestBtn')?.addEventListener('click', () => guestController.navigateToLogin());
    document.getElementById('registerGuestBtn')?.addEventListener('click', () => guestController.navigateToRegister());
    document.getElementById('guestLoginBtn')?.addEventListener('click', () => {
      const email = document.getElementById('guestEmail')?.value;
      guestController.login(email);
    });

    // Gắn sự kiện đổi dark mode
    document.getElementById('toggleDarkMode')?.addEventListener('click', () => {
      guestController.toggleDarkMode();
    });
  }

  // Gắn ngôn ngữ
  document.getElementById('languageSelect')?.addEventListener('change', (e) => {
    const lang = e.target.value;
    loadTranslations(lang);
  });

  loadTranslations('en');

  // Áp dụng lại dark mode nếu đang bật
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
