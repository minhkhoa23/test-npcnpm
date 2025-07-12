import { renderStats } from '../views/adminView.js';
import { apiCall } from '../api.js';

class AdminController {
    async getStats() {
        const stats = await apiCall('http://localhost:3000/api/stats');
        renderStats(stats);
    }
}

export const adminController = new AdminController();