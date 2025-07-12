class Tournament {
    constructor(id, name, format) {
        this.id = id;
        this.name = name;
        this.format = format;
        this.teams = [];
        this.sponsors = [];
        this.results = {};
    }
}

export default Tournament;