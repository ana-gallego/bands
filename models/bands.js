const Band = require("./band");

class Bands {

    constructor() {
        this.bands = [];

    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    delete(bandId) {
        this.bands = this.bands.filter(b => b.id !== bandId);
        return this.bands;
    }

    voteBand(id) {
        this.bands = this.bands.map(b => {
            if (b.id === id) {
                b.votes++;
                return b;
            } else {
                return b;
            }
        });
    }
}

module.exports = Bands;