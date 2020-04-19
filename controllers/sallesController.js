let Salle = require('../models/salleModel');
let connection = require('../db');
let salleList = [];

// Liste des salles
exports.salleList = function (request, response) {    
    connection.query("Select * from salles", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            salleList =  resultSQL;
            console.log(salleList);
            response.render('salles.ejs', {salles:salleList});
        }
    });
}

//Ajouter / modifier une salle
exports.salleNew =  function(request, response) {
    //Transformation de la valeur de la checkbox on vers 1 pour bdd / boolean
    if(request.body.extra === "on"){ 
        request.body.extra = 1
    } 
    else { 
        request.body.extra = 0
    }
    let id = request.body.id
    let name =  request.body.name;
    let extra = request.body.extra;
    if ( id == -1)
    {
        let salle = new Salle(name, extra);
        console.log(salle);
        connection.query("INSERT INTO salles set ?", salle, function (error, resultSQL) {
            if(error) {
                response.status(400).send(error);
            }
            else{
                response.status(201).redirect('/salles');
            }
        });
    }
    else if( id >=0 )
    {
        let salle = new Salle(name, extra);
        console.log(salle); 
        connection.query("UPDATE salles SET ? WHERE id = ?", [salle, request.body.id], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/salles');
            }
        });
    }
    //console.log(salleList);
    //console.log(request.body);
}

// Envoyer formulaire pour rajouter une salle
exports.salleFormAdd = function(request, response) {
    response.render('salleAdd.ejs', {id:'-1', name:"", extra:""});
}

//Envoyer formulaire pour updater une salle
exports.salleFormUpdate = function (request, response) {
    let id = request.params.id;
    connection.query("Select * from salles WHERE id = ?", id, function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            salles = resultSQL;
            response.render('salleAdd.ejs', {id:id, name:salles[0].name, extra:salles[0].extra});
        }
    });
    //console.log(request.body);
}

//Delete salles
exports.salleRemove = function (request, response) {
    let sql = "DELETE FROM `salles` WHERE `salles`.`id` = ?";
    connection.query( sql , [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/salles');
        }
    }); 
    
 };