let Film = require('../models/filmModel');
let connection = require('../db');
let filmList = [];

//Listes des films
exports.filmList = function (request, response) {
    let title = request.query.title; 
    //console.log(title);
    if (!(title)){
        connection.query("Select films.id, films.title, categories.name AS 'genre' from films LEFT join categories on categories.id = films.id_categorie", function (error, resultSQL) {
            if (error){
                response.status(400).json({'message': error});      
            }
            else {
                response.status(200);
                filmList = resultSQL;
                console.log(filmList);
                response.json({films:filmList});
            }
        });
    } else {
        connection.query("Select films.id, films.title, categories.name AS 'genre' from films LEFT join categories on categories.id = films.id_categorie WHERE films.title LIKE" + connection.escape('%'+title+'%'), function (error, resultSQL) {
            if (error){
                response.status(400).json({'message': error});      
            }
            else {
                response.status(200);
                filmList = resultSQL;
                console.log(filmList);
                response.json({films:filmList});
            }
        });
    } 
}


//Lister film solo
exports.filmListSolo = function (request, response) {
    let id = request.params.id; 
    console.log(id);
        connection.query("Select films.id, films.title,categories.name AS 'genre' from films LEFT join categories on categories.id = films.id_categorie WHERE films.id = ?", id, function (error, resultSQL) {
            if (error){
                response.status(400).json({'message': error});      
            }
            else {
                response.status(200);
                filmList = resultSQL;
                console.log(filmList);
                response.json({films:filmList});
            }
        });
    
}

//Ajouter un film 
exports.filmNew = function(request, response) {
    let title = request.body.title;
    let id_categorie = request.body.id_categorie;

    let film = new Film(title, id_categorie);
    console.log(film);
    connection.query("INSERT INTO films SET ?", film, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error}); 
        }
        else{
            response.status(201).json({'message': 'Nouveau film rajouté à la liste'}); 
        }
    });
}

//Updater un film 
exports.filmUpdate = function(request, response) {
    let id = request.params.id;
    let title =  request.body.title;
    let id_categorie = request.body.genre;

    let film = new Film(title, id_categorie);
    console.log(film);
    connection.query("UPDATE films SET ? WHERE id = ?", [film, id], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL"});  
        }
        else{
            response.status(202).json({'message': "Film mis à jour"}); 
        }
    });
    console.log(filmList);
}

//Delete un film
exports.filmRemove = function (request, response) {
    let sql = "DELETE FROM films WHERE `films`.`id` = ?";
    connection.query( sql , [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'Film supprimé'}); 
        }
    }); 
};