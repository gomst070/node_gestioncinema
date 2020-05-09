//Definir les routes
let express = require('express');
let router = express.Router();      

//Import controller
var loginController = require('./controllers/loginController');

var userController = require('./controllers/userController');
var userControllerApi = require('./controllers/userControllerApi');

var filmsController = require('./controllers/filmsController');
var filmsControllerApi = require('./controllers/filmsControllerApi');

var sallesController = require('./controllers/sallesController');
var sallesControllerApi = require('./controllers/sallesControllerApi');

var seancesController = require('./controllers/seancesController');
var seancesControllerApi = require('./controllers/seancesControllerApi');

var categoriesController = require('./controllers/categoriesController');
var categoriesControllerApi = require('./controllers/categoriesControllerApi');

router.get('/', (request, response) => response.render('home.ejs'));
router.get('/ressources', (request, response) => response.render('ressources.ejs'));
router.get('/login', (request, response) => response.render('login.ejs'));

//Login routes
router.post('/connexion', loginController.userLogin);
router.get('/logout', loginController.userLogout);

//Routes users
router.get('/user', userController.userList);
router.get('/user/add', userController.userAdd);
router.post('/user/new', userController.userNew);
router.get('/user/update/:id', userController.userUpdate);
router.get('/user/delete/:id', userController.userRemove);

//API routes users
router.get('/api/user', userControllerApi.userList);
router.post('/api/user', userControllerApi.userNew);
router.put('/api/user/:id', userControllerApi.userUpdate);
router.delete('/api/user/:id', userControllerApi.userRemove);

//Routes films
router.get('/films', filmsController.filmList);
router.get('/filmsadd', filmsController.filmFormAdd);
router.post('/films/new', filmsController.filmNew);
router.get('/filmsupdate/:id', filmsController.filmFormUpdate);
router.get('/films/delete/:id', filmsController.filmRemove);

//API routes films
router.get('/api/films', filmsControllerApi.filmList);
router.get('/api/films/:id', filmsControllerApi.filmListSolo);
router.post('/api/films', filmsControllerApi.filmNew);
router.put('/api/films/:id', filmsControllerApi.filmUpdate);
router.delete('/api/films/:id', filmsControllerApi.filmRemove);

//Routes salles
router.get('/salles', sallesController.salleList);
router.get('/salles/add', sallesController.salleFormAdd);
router.post('/salles/new', sallesController.salleNew);
router.get('/salles/update/:id', sallesController.salleFormUpdate);
router.get('/salles/delete/:id', sallesController.salleRemove);

//API routes salles
router.get('/api/salles', sallesControllerApi.salleList);
router.get('/api/salles/:id', sallesControllerApi.salleListSolo);
router.post('/api/salles', sallesControllerApi.salleNew);
router.put('/api/salles/:id', sallesControllerApi.salleUpdate);
router.delete('/api/salles/:id', sallesControllerApi.salleRemove);

//Routes séances
router.get('/seances', seancesController.seanceList);
router.get('/seancesold', seancesController.seanceListOld);
router.get('/seancesadd', seancesController.seanceFormAdd);
router.post('/seances/new', seancesController.seanceNew);
router.get('/seancesupdate/:id', seancesController.seanceFormUpdate);
router.get('/seances/delete/:id', seancesController.seanceRemove);

//API routes séances
router.get('/api/seances', seancesControllerApi.seanceList);
router.get('/api/seances/old', seancesControllerApi.seanceListOld);
router.get('/api/seances/:id', seancesControllerApi.seanceListSolo);
router.post('/api/seances', seancesControllerApi.seanceNew);
router.put('/api/seances/:id', seancesControllerApi.seanceUpdate);
router.delete('/api/seances/:id', seancesControllerApi.seanceRemove);

//Routes genre de films
router.get('/categories', categoriesController.categorieList);
router.get('/categoriesadd', categoriesController.categorieFormAdd);
router.post('/categories/new', categoriesController.categorieNew);
router.get('/categoriesupdate/:id', categoriesController.categorieFormUpdate);
router.get('/categories/delete/:id', categoriesController.categorieRemove);

//API routes genre de films
router.get('/api/categories', categoriesControllerApi.categorieList);
router.get('/api/categories/:id', categoriesControllerApi.categorieListSolo);
router.post('/api/categories', categoriesControllerApi.categorieNew);
router.put('/api/categories/:id', categoriesControllerApi.categorieUpdate);
router.delete('/api/categories/:id', categoriesControllerApi.categorieRemove);

module.exports = router;