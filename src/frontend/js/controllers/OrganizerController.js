import Organizer from '../models/Organizer.js';
import { renderCreateTournament } from '../views/organizerView.js';
import { apiCall } from '../api.js';

class OrganizerController {
    constructor() {
        this.currentOrganizer = null;
    }

    async createTournament() {
        const name = document.getElementById('tournamentName').value;
        const format = document.getElementById('tournamentFormat').value;
        this.currentOrganizer = new Organizer({
            _id: Date.now().toString(),
            fullName: 'Org Name',
            role: 'organizer'
        });
        const tournament = this.currentOrganizer.createTournament(name, format);
        await apiCall('http://localhost:3000/api/tournaments', tournament, 'POST');
        renderCreateTournament();
    }
}

export const organizerController = new OrganizerController();