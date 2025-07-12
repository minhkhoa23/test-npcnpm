import Organizer from '../models/Organizer.js';
import Tournament from '../models/Tournament.js';
import { renderCreateTournament } from '../views/organizerView.js';
import { apiCall } from '../api.js';

class OrganizerController {
    constructor() {
        this.currentOrganizer = null;
    }

    async createTournament() {
        const name = document.getElementById('tournamentName').value;
        const format = document.getElementById('tournamentFormat').value;
        this.currentOrganizer = new Organizer(Date.now().toString(), "Org Name");
        const tournament = this.currentOrganizer.createTournament(name, format);
        await apiCall('http://localhost:3000/api/tournaments', tournament, 'POST');
        renderCreateTournament();
    }
}

export const organizerController = new OrganizerController();