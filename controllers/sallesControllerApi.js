let Salle = require('../models/salleModel');
let connection = require('../db');
let salleList = [];

// Liste des salles
exports.salleList = function (request, response) {    
    connection.query("Select * from salles", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});    
        }
        else {
            response.status(200);
            salleList =  resultSQL;
            console.log(salleList);
            response.json({salles:salleList});
        }
    });
}

//Afficher une salle solo
exports.salleListSolo = function (request, response) {
    let id = request.params.id; 
    console.log(id);
    connection.query("Select * from salles WHERE id = ?", id, function (error, resultSQL) {
        if (error){
            response.status(400).json({'message': error});      
        } else {
            response.status(200);
            salleList = resultSQL;
            console.log(salleList);
            response.json({salles:salleList});
        }
    });
}

//Ajouter une salle
exports.salleNew = function(request, response) {
    if(request.body.extra === true){ 
        request.body.extra = 1
    } 
    else { 
        request.body.extra = 0
    }
    let name =  request.body.name;
    let extra = request.body.extra;
    let salle = new Salle(name, extra);
    connection.query("INSERT INTO salles set ?", salle, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error}); 
        }
        else{
            response.status(201).json({'message': 'Nouvelle salle rajoutée'}); 
        }
    });
}

//Updater une salle
exports.salleUpdate = function(request, response) {
    let id = request.params.id;
    let name =  request.body.name;
    let extra = request.body.extra;
    
    let salle = new Salle(name, extra);
    connection.query("UPDATE salles SET ? WHERE id = ?", [salle, id], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL"});  
        }
        else{
            response.status(202).json({'message': "Salle mise à jour"}); 
        }
    });
}

//Delete une salle
exports.salleRemove = function (request, response) {
    let sql = "DELETE FROM salles WHERE `salles`.`id` = ?";
    connection.query(sql, [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'Salle supprimée'}); 
        }
    }); 
};