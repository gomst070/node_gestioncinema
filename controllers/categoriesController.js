let Categorie = require('../models/categorieModel');
let connection = require('../db');
let categorieList = [];

// Liste des salles
exports.categorieList = function (request, response) {    
    connection.query("SELECT * FROM categories", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            categorieList =  resultSQL;
            console.log(categorieList);
            response.render('categories.ejs', {categories:categorieList});
        }
    });
}

// Ajouter / modifier un genre de film
exports.categorieNew =  function(request, response) {
    let id = request.body.id;
    let name =  request.body.name;
    if ( id == -1)
    {
        let categorie = new Categorie(name);
        console.log(categorie);
        connection.query("INSERT INTO categories set ?", categorie, function (error, resultSQL) {
            if(error) {
                response.status(400).send(error);
            }
            else{
                response.status(201).redirect('/categories');
            }
        });
    }
    else if( id >=0 )
    {
        let categorie = new Categorie(name);
        console.log(categorie);
        connection.query("UPDATE categories SET ? WHERE id = ?", [categorie, request.body.id], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/categories');
            }
        });
    }
    console.log(categorieList);
}

//Envoyer formulaire update
exports.categorieFormAdd = function(request, response) {
    response.render('categorieAdd.ejs', {id:'-1', name:""});
}

//Envoyer formulaire nouveau genre de films
exports.categorieFormUpdate = function (request, response) {
    let id = request.params.id;
    connection.query("Select * from categories WHERE id = ?", id ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            categories = resultSQL;
            response.render('categorieAdd.ejs', {id:id, name:categories[0].name});
        }
    });
}

//Delete categories
exports.categorieRemove = function (request, response) {
    let sql = "DELETE FROM `categories` WHERE `categories`.`id` = ?";
    connection.query( sql , [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/categories');
        }
    }); 
};