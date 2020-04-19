let Seance = require('../models/seanceModel');
let connection = require('../db');
let seanceList = [];
let seanceListOld = [];

// Liste des séances à venir
exports.seanceList = function (request, response) {  
    connection.query("Select seances.id, DATE_FORMAT(date, '%d/%m/%Y') AS date, DATE_FORMAT(seances.heures, '%H:%i') AS heures, films.title, salles.name, salles.extra from `seances` LEFT join films on films.id = seances.id_film LEFT join salles on salles.id = seances.id_salle WHERE date >= CURDATE() AND heures >= CURTIME() ORDER BY date", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            seanceList =  resultSQL;
            console.log(seanceList);
            response.render('seances.ejs', {seances:seanceList});
        }
    });
}

// Liste des séances archivées
exports.seanceListOld = function (request, response) {  
    connection.query("Select seances.id, DATE_FORMAT(date, '%d/%m/%Y') AS date, DATE_FORMAT(seances.heures, '%H:%i') AS heures, films.title, salles.name, salles.extra from seances LEFT join films on films.id = seances.id_film LEFT join salles on salles.id = seances.id_salle WHERE date <= CURDATE() ORDER BY date", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            seanceListOld =  resultSQL;
            console.log(seanceList);
            response.render('seanceOld.ejs', {seancesold:seanceListOld});
        }
    });
}

//Ajouter / modifier une seance
exports.seanceNew =  function(request, response) {
    let id = request.body.id
    let date =  request.body.date;
    let heures =  request.body.heures;
    let id_film = request.body.id_film;
    let id_salle = request.body.id_salle;
    if (id == "")
    {
        let seance = new Seance(date, heures, id_film, id_salle);
        console.log(seance);
        connection.query("INSERT INTO seances set ?", seance, function (error, resultSQL) {
            if(error) {
                response.status(400).send(error);
            }
            else{
                response.status(201).redirect('/seances');
            }
        });
    }
    else if( id >=0 )
    {
        let seance = new Seance(date, heures, id_film, id_salle);
        console.log(seance);
        connection.query("UPDATE seances SET ? WHERE id = ?", [seance, request.body.id], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/seances');
            }
        });
    }
    //console.log(seanceList);
}

//Envoyer formulaire pour rajouter un film
exports.seanceFormAdd = function(request, response) {
    connection.query("Select * from films", function (error, resultSQL2){
        if (error) {
            response.status(400).send(error);
        }
        else{
            connection.query("Select * from salles", function (error, resultSQL3){
                if (error) {
                    response.status(400).send(error);
                }
                else{
                    response.status(200);
                    response.render('seanceAdd.ejs',{seances:{id:"", date:"", id_film:""}, films:resultSQL2, salles:resultSQL3});
                }
            });
        }
    });
}

//Envoyer formulaire pour updater une seance 
exports.seanceFormUpdate = function (request, response) {
    let id = request.params.id;
    connection.query("Select * from seances WHERE id = ?", id, function (error, resultSQL){
        //Convert date format 
        for (var i = 0; i < resultSQL.length; i++) {
            for (key in resultSQL[i]) {
                if(resultSQL[i][key] != null){
                    if(typeof resultSQL[i][key].getDate == 'function'){
                        if(resultSQL[i][key].getMonth()+1 < 10){
                            resultSQL[i][key] = resultSQL[i][key].getFullYear()+'-0'+(resultSQL[i][key].getMonth()+1)+'-'+resultSQL[i][key].getDate();
                        }else{
                            resultSQL[i][key] = resultSQL[i][key].getFullYear()+'-'+(resultSQL[i][key].getMonth()+1)+'-'+resultSQL[i][key].getDate();						
                        }
                    }
                }
            }
        }
        if (error)  {
            response.status(400).send(error);
        }
        else{
            connection.query("Select id, title from films", function (error, resultSQL2){
                if (error) {
                    response.status(400).send(error);
                }
                else{
                    connection.query("Select * from salles", function (error, resultSQL3){
                        if (error) {
                            response.status(400).send(error);
                        }
                        else{
                            response.status(200);
                            response.render('seanceAdd.ejs', {seances:resultSQL[0], films:resultSQL2, salles:resultSQL3})
                        }
                    })
                }
            })
        }
    });
    console.log(request.body);
}

//Delete seances
exports.seanceRemove = function (request, response) {
    let sql = "DELETE FROM `seances` WHERE `seances`.`id` = ?";
    connection.query( sql , [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/seances');
        }
    }); 
    
 };