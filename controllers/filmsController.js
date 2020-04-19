let Film = require('../models/filmModel');
let connection = require('../db');
let filmList = [];

// Listes des films
exports.filmList = function (request, response) {    
    connection.query("Select films.id, films.title, categories.name from films LEFT join categories on categories.id = films.id_categorie", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            filmList =  resultSQL;
            //console.log(filmList);
            response.render('films.ejs', {films:filmList});
        }
    });
}

//Ajouter / modifier un film
exports.filmNew = function(request, response) {
    //console.log(request.body);
    let id = request.body.id
    let title =  request.body.title;
    let id_categorie = request.body.id_categorie;
    if ( id == "")
    {
        let film = new Film(title, id_categorie);
        console.log(film);
        connection.query("INSERT INTO films SET ?", film, function (error, resultSQL) {
            if(error) {
                response.status(400).send(error);
            }
            else{
                response.status(201).redirect('/films');
            }
        });
    }
    else if( id >=0 )
    {
        let film = new Film(title, id_categorie);
        console.log(film);
        connection.query("UPDATE films SET ? WHERE id = ?", [film, id], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/films');
            }
        });
    }
    //console.log(filmList);
}

// Envoyer formulaire pour rajouter un film
exports.filmFormAdd = function(request, response) {
    connection.query("Select * from categories", function (error, resultSQL2){
        if (error) {
            response.status(400).send(error);
        }
        else{
            response.status(200);
            response.render('filmAdd.ejs', {films:{id:"", title:"", id_categorie:""}, categories:resultSQL2});
        }
    })
}

//Envoyer formulaire pour updater un film
exports.filmFormUpdate = function (request, response) {
    let id = request.params.id;
    connection.query("Select * from films WHERE films.id = ?", id,function (error, resultSQL){
        if (error)  {
            response.status(400).send(error);
        }
        else{
            connection.query("Select id, name from categories", function (error, resultSQL2){
                if (error) {
                    response.status(400).send(error);
                }
                else{
                    response.status(200);
                    response.render('filmAdd.ejs', {films:resultSQL[0], categories:resultSQL2})
                }
            })
        }
    });
    console.log(request.body);
}

//Delete films
exports.filmRemove = function (request, response) {
    let sql = "DELETE FROM `films` WHERE `films`.`id` = ?";
    connection.query( sql , [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/films');
        }
    }); 
    
 };