let Categorie = require('../models/categorieModel');
let connection = require('../db');
let categorieList = [];

// Liste des salles
exports.categorieList = function (request, response) {    
    connection.query("SELECT * FROM categories", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});        
        }
        else {
            response.status(200);
            categorieList =  resultSQL;
            console.log(categorieList);
            response.json({categories:categorieList});
        }
    });
}

//Afficher un genre solo
exports.categorieListSolo = function (request, response) {
    let id = request.params.id; 
    console.log(id);
    connection.query("Select * from categories WHERE id = ?", id, function (error, resultSQL) {
        if (error){
            response.status(400).json({'message': error});      
        } else {
            response.status(200);
            categorieList = resultSQL;
            console.log(categorieList);
            response.json({categories:categorieList});
        }
    });
}

//Ajouter une catégorie / genre de film 
exports.categorieNew = function(request, response) {
    let name =  request.body.name;
    let categorie = new Categorie(name);

    connection.query("INSERT INTO categories set ?", categorie, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error}); 
        }
        else{
            response.status(201).json({'message': 'Nouveau genre de film rajouté à la liste'}); 
        }
    });
}

//Updater une catégorie / genre de films 
exports.categorieUpdate = function(request, response) {
    let id = request.params.id;
    let name =  request.body.name;
    let categorie = new Categorie(name);
    connection.query("UPDATE categories SET ? WHERE id = ?", [categorie, id], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL"});  
        }
        else{
            response.status(202).json({'message': "Genre de film mis à jour"}); 
        }
    });
}

//Delete categories
exports.categorieRemove = function (request, response) {
    let sql = "DELETE FROM `categories` WHERE `categories`.`id` = ?";
    connection.query(sql, [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'Genre de film supprimé'}); 
        }
    })
}; 