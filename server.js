//Appeler & utiliser express pour l'appli
let express    = require('express');        
let app        = express();    
let bodyParser = require('body-parser');   
let session    = require('express-session');          

//Configuration parser => POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Session 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Utilisation session
app.use(function(request, response, next) {
	response.locals.loggedin = request.session.loggedin;
	response.locals.name = request.session.name;
	response.locals.error1 = request.session.error1;
	next();
});

//Importer les routes
let router = require('./routes');
app.use('/', router);

//Utiliser le dossier images
app.use('/images', express.static('./images'));

//Utiliser le dossier images
app.use('/css', express.static('./css'));

//Utiliser le dossier images
app.use('/script/', express.static('./script'));

//Port
var port = 8000
app.listen(port, function () { console.log('Navigateur localhost:' + port); })