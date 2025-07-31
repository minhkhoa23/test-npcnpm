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

  // Load dynamic content
  await loadTournaments();
  await loadNews();
  await loadHighlights();
}

async function loadTournaments() {
  try {
    const tournaments = await apiCall('/api/tournaments');
    const tournamentsList = document.getElementById('tournamentsList');

    if (tournaments.length === 0) {
      tournamentsList.innerHTML = '<div class="no-content">No tournaments available</div>';
      return;
    }

    tournamentsList.innerHTML = tournaments.map(tournament => `
      <div class="tournament-card">
        <h4 class="tournament-title">${tournament.name}</h4>
        <p class="tournament-description">${tournament.description}</p>
        <div class="tournament-meta">
          <span class="tournament-status status-${tournament.status}">${tournament.status}</span>
          <span class="tournament-format">${tournament.format} format</span>
        </div>
        <div class="tournament-dates">
          <small>Start: ${new Date(tournament.startDate).toLocaleDateString()}</small>
          <small>End: ${new Date(tournament.endDate).toLocaleDateString()}</small>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading tournaments:', error);
    document.getElementById('tournamentsList').innerHTML = '<div class="error-message">Failed to load tournaments</div>';
  }
}

async function loadNews() {
  try {
    const news = await apiCall('/api/news');
    const newsList = document.getElementById('newsList');

    if (news.length === 0) {
      newsList.innerHTML = '<div class="no-content">No news available</div>';
      return;
    }

    newsList.innerHTML = news.slice(0, 6).map(newsItem => `
      <div class="news-card">
        <h4 class="news-title">${newsItem.title}</h4>
        <p class="news-content">${newsItem.content}</p>
        <div class="news-meta">
          <small class="news-date">Published: ${new Date(newsItem.publishedAt).toLocaleDateString()}</small>
          <span class="news-status">${newsItem.status}</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading news:', error);
    document.getElementById('newsList').innerHTML = '<div class="error-message">Failed to load news</div>';
  }
}

async function loadHighlights() {
  try {
    const highlights = await apiCall('/api/highlights');
    const highlightsList = document.getElementById('highlightsList');

    if (highlights.length === 0) {
      highlightsList.innerHTML = '<div class="no-content">No highlights available</div>';
      return;
    }

    highlightsList.innerHTML = highlights.slice(0, 4).map(highlight => `
      <div class="highlight-card">
        <h4 class="highlight-title">${highlight.title}</h4>
        <p class="highlight-description">${highlight.description}</p>
        <div class="highlight-video">
          <a href="${highlight.videoUrl}" target="_blank" class="video-link">
            🎬 Watch Video
          </a>
        </div>
        <div class="highlight-meta">
          <small class="highlight-date">Created: ${new Date(highlight.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading highlights:', error);
    document.getElementById('highlightsList').innerHTML = '<div class="error-message">Failed to load highlights</div>';
  }
}
