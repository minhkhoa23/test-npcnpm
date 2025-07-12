import { renderGuestView } from '../views/guestView.js';

export default class GuestController {
  renderGuestView() {
    renderGuestView();
  }

  navigateToLogin() {
    window.location.href = 'login.html';
  }

  navigateToRegister() {
    alert('Registration feature coming soon!');
    window.location.href = 'login.html';
  }

  login(email) {
    if (email) {
      alert(`Logging in with email: ${email}`);
      window.location.href = 'index.html';
    } else {
      alert('Please enter an email!');
    }
  }

  toggleDarkMode() {
    const enabled = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');
  }
}
