let User = require('../models/userModel');
let connection = require('../db');
let userList = [];

//Liste des utilisateurs
exports.userList = function (request, response) {    
    connection.query("Select * from users", function (error, resultSQL) {
        if (error){
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            userList = resultSQL;
            console.log(userList);
            response.render('users.ejs', {users:userList});
        }
    });
}

// Ajouter ou modifier utilisateur
exports.userNew =  function(request, response) {
    let id = request.body.id;
    let name =  request.body.name;
    let password =  request.body.password;
    if ( id == -1)
    {
        let user = new User(name, password);
        console.log(user);
        connection.query("INSERT INTO users set ?", user, function (error, resultSQL) {
            if(error) {
                response.status(400).send(error);
            }
            else{
                response.status(201).redirect('/user');
            }
        });
    }
    else if( id >=0 )
    {
        let user = new User(name, password);
        console.log(user);
        connection.query("UPDATE users SET ? WHERE id = ?", [user, request.body.id], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/user');
            }
        });
    }
    console.log(userList);
}

//Envoyer formulaire pour rajouter un utilisateur
exports.userAdd = function(request, response) {
    response.render('userAdd.ejs', {id:'-1', name:"", password:""});
}

//Envoyer formulaire pour modifier un utilisateur
exports.userUpdate =function (request, response) {
    let id = request.params.id;
    connection.query("Select * from users WHERE id = ?", id ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            users = resultSQL;
            response.render('userAdd.ejs', {id:id, name:users[0].name, password:""});
        }
    });
}

//Supprimer utilisateur
exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `users` WHERE `users`.`id` = ?";
    connection.query( sql , [request.params.id], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/user');
        }
    }); 
    
 };