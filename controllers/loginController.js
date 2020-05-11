let connection = require('../db');

exports.userLogin = function (request, response) {
    console.log(request.body);
    let name = request.body.name;
    let password = request.body.password;
        if (name && password !== '') {
            connection.query('SELECT * FROM users WHERE name = ? AND password = ?', [name, password], function(error, resultSQL, fields) {
                if (resultSQL.length > 0) {
                    request.session.loggedin = true;
                    request.session.name = request.body.name;
                    response.cookie('nom', request.body.name);
                    response.status(201).redirect('/');
                } else {
                    request.session.error1 = 'Mauvais nom et/ou mot de passe! Veuillez réessayer svp!';
                    response.redirect('/login');
                }			
                    response.end();
                });
        } else {
            response.send('<h3 style="color:red;">Veuillez rentrez les champs nom et mot de passe svp!</h3><input type="button" value="Retour" onclick="history.go(-1)">');
            response.end();
        }
};  

// Logout and destroy session
exports.userLogout = function (request, response) {
    request.session.destroy();
    response.clearCookie('nom');
    response.status(201).redirect('/');
};