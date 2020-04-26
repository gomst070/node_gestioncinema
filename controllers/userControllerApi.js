let User = require('../models/userModel');
let connection = require('../db');
let userList = [];

//Liste des utilisateurs
exports.userList = function (request, response) {    
    connection.query("Select * from users", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});          
        }
        else {
            response.status(200);
            userList =  resultSQL;
            console.log(userList);
            response.json({users:userList});
        }
    });
}

//Ajouter un utilisateur
exports.userNew = function(request, response) {
    let name =  request.body.name;
    let password =  request.body.password;
    
    let user = new User(name,password);
    connection.query("INSERT INTO users set ?", user, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error}); 
        }
        else{
            response.status(201).json({'message': 'Nouveau utilisateur ajouté'}); 
        }
    });
}


//Updater un utilisateur
exports.userUpdate = function(request, response) {
    let id = request.params.id;
    let name =  request.body.name;
    let password = request.body.password;
    //console.log(password);
    /*
    if (!(request.body.password) || request.body.password == ''){
        connection.query("Select password from users WHERE id = ?", [id], function (error, helpresult) {
            if(error) {
                response.status(400).json({'message': error});  
            } else {
                password = helpresult;
            }
        });
    }*/
    
    let user = new User(name, password);
    connection.query("UPDATE users SET ? WHERE id = ?", [user, id], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL"});  
        }
        else{
            response.status(202).json({'message': "Utilisateur mis à jour"}); 
        }
    });
}


//Supprimer utilisateur
exports.userRemove = function (request, response) {
    let sql = "DELETE FROM users WHERE `users`.`id` = ?";
    connection.query(sql, [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'Utilisateur supprimé'}); 
        }
    }); 
};