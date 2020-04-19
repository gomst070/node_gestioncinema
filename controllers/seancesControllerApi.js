let Seance = require('../models/seanceModel');
let connection = require('../db');
let seanceList = [];
let seanceListOld = [];

// Liste des séances à venir
exports.seanceList = function (request, response) {  
    connection.query("Select seances.id, DATE_FORMAT(date, '%d/%m/%Y') AS date, DATE_FORMAT(seances.heures, '%H:%i') AS heures, films.title, salles.name, salles.extra from `seances` LEFT join films on films.id = seances.id_film LEFT join salles on salles.id = seances.id_salle WHERE date > CURDATE() AND heures > CURTIME() ORDER BY date", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});   
        }
        else {
            response.status(200);
            seanceList =  resultSQL;
            //console.log(seanceList);
            response.json({seances:seanceList});
        }
    });
}

// Liste des séances archivées
exports.seanceListOld = function (request, response) {  
    connection.query("Select seances.id, DATE_FORMAT(date, '%d/%m/%Y') AS date, DATE_FORMAT(seances.heures, '%H:%i') AS heures, films.title, salles.name, salles.extra from seances LEFT join films on films.id = seances.id_film LEFT join salles on salles.id = seances.id_salle WHERE date < CURDATE() ORDER BY date", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});          
        }
        else {
            response.status(200);
            seanceListOld =  resultSQL;
            //console.log(seanceList);
            response.json({seancesold:seanceListOld});
        }
    });
}


//Ajouter une séance
exports.seanceNew = function(request, response) {
    let date =  request.body.date;
    let heures =  request.body.heures;
    let id_film = request.body.id_film;
    let id_salle = request.body.id_salle;
    let seance = new Seance(date, heures, id_film, id_salle);

    connection.query("INSERT INTO seances set ?", seance, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error}); 
        }
        else{
            response.status(201).json({'message': 'Nouvelle séance rajoutée'}); 
        }
    });
}

//Updater une séance
exports.seanceUpdate = function(request, response) {
    let id = request.params.id;
    let date =  request.body.date;
    let heures =  request.body.heures;
    let id_film = request.body.id_film;
    let id_salle = request.body.id_salle;
    let seance = new Seance(date, heures, id_film, id_salle);
    console.log(seance);
    connection.query("UPDATE seances SET ? WHERE id = ?", [seance, id], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL"});  
        }
        else{
            response.status(202).json({'message': "Séance mise à jour"}); 
        }
    });
}

//Delete une séance
exports.seanceRemove = function (request, response) {
    let sql = "DELETE FROM seances WHERE `seances`.`id` = ?";
    connection.query(sql, [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'Séance supprimée'}); 
        }
    }); 
};