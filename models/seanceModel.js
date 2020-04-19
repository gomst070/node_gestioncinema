class Seance {
    date="";
    heures="";
    id_film="";
    id_salle="";
    constructor(date, heures, id_film, id_salle)
    {
        this.date = date;
        this.heures = heures;
        this.id_film = id_film;
        this.id_salle = id_salle;
    }
    
};
module.exports = Seance;