//Appeler & utiliser express pour l'appli
let express    = require('express');        
let app        = express();                 

//Configuration parser => POST request
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Importer les routes
let router = require('./routes');
app.use('/', router);

//Utiliser le dossier images
app.use('/images/', express.static('./images'));

//Port 
var port = 8000
app.listen(port, function () { console.log('Navigateur => localhost:' + port); })