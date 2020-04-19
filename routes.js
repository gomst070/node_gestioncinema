//Definir les routes
let express = require('express');
let router = express.Router();              

//Import controller
var userController = require('./controllers/userController');

var filmsController = require('./controllers/filmsController');
var filmsControllerApi = require('./controllers/filmsControllerApi');

var sallesController = require('./controllers/sallesController');
var sallesControllerApi = require('./controllers/sallesControllerApi');

var seancesController = require('./controllers/seancesController');
var seancesControllerApi = require('./controllers/seancesControllerApi');

var categoriesController = require('./controllers/categoriesController');
var categoriesControllerApi = require('./controllers/categoriesControllerApi');

router.get('/', (request, response) => response.render('home.ejs'));

//Routes users
router.get('/user', userController.userList);
router.get('/user/add', userController.userFormAdd);
router.post('/user/new', userController.userNew);
router.get('/user/update/:id', userController.userFormUpdate);
router.get('/user/delete/:id', userController.userRemove);

//Routes films
router.get('/films', filmsController.filmList);
router.get('/films/add', filmsController.filmFormAdd);
router.post('/films/new', filmsController.filmNew);
router.get('/films/update/:id', filmsController.filmFormUpdate);
router.get('/films/delete/:id', filmsController.filmRemove);

//API routes films
router.get('/api/films', filmsControllerApi.filmList);
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
router.post('/api/salles', sallesControllerApi.salleNew);
router.put('/api/salles/:id', sallesControllerApi.salleUpdate);
router.delete('/api/salles/:id', sallesControllerApi.salleRemove);

//Routes séances
router.get('/seances', seancesController.seanceList);
router.get('/seances/old', seancesController.seanceListOld);
router.get('/seances/add', seancesController.seanceFormAdd);
router.post('/seances/new', seancesController.seanceNew);
router.get('/seances/update/:id', seancesController.seanceFormUpdate);
router.get('/seances/delete/:id', seancesController.seanceRemove);

//API routes séances
router.get('/api/seances', seancesControllerApi.seanceList);
router.get('/api/seances/old', seancesControllerApi.seanceListOld);
router.post('/api/seances', seancesControllerApi.seanceNew);
router.put('/api/seances/:id', seancesControllerApi.seanceUpdate);
router.delete('/api/seances/:id', seancesControllerApi.seanceRemove);

//Routes genre de films
router.get('/categories', categoriesController.categorieList);
router.get('/categories/add', categoriesController.categorieFormAdd);
router.post('/categories/new', categoriesController.categorieNew);
router.get('/categories/update/:id', categoriesController.categorieFormUpdate);
router.get('/categories/delete/:id', categoriesController.categorieRemove);

//API routes genre de films
router.get('/api/categories', categoriesControllerApi.categorieList);
router.post('/api/categories', categoriesControllerApi.categorieNew);
router.put('/api/categories/:id', categoriesControllerApi.categorieUpdate);
router.delete('/api/categories/:id', categoriesControllerApi.categorieRemove);

module.exports = router;