import User from '../models/User.js';
import { renderSearch, renderTournamentDetails } from '../views/userView.js';
import { apiCall } from '../api.js';

class UserController {
    constructor() {
        this.currentUser = null;
    }

    async searchTournaments(query) {
        const data = await apiCall('http://localhost:3000/api/tournaments/search', { query });
        renderSearch(data);
    }

    async login(email) {
        const data = await apiCall('http://localhost:3000/api/login', { email }, 'POST');
        this.currentUser = new User(data.id, data.name, email);
        // Redirect to index.html after login
        window.location.href = 'index.html';
        renderTournamentDetails(await apiCall('http://localhost:3000/api/tournaments/1'));
    }
}

export const userController = new UserController();