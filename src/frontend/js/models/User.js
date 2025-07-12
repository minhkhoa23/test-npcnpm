class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.favorites = [];
    }

    addFavorite(tournamentId) {
        this.favorites.push(tournamentId);
    }
}

export default User;