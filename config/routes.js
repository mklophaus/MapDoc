var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');
var docsController =    require('../controllers/docs');

// root path:
router.get('/', welcomeController.index);

// users resource paths:
router.post('/login',  usersController.userAuth);
router.get('/users',   usersController.usersAll);
router.post('/users',  usersController.userCreate);
router.get('/users/:id', usersController.tokenVerify, usersController.userShow);
router.put('/users/:id',     usersController.tokenVerify, usersController.userUpdate);
router.delete('/users/:id',  usersController.tokenVerify, usersController.userDelete);


///DOCS ROUTES
router.get('/docs/:id',    docsController.docShow);
router.get('/docs',       docsController.docIndex);
router.post('/docs',      docsController.docCreate);
router.put('/docs/:id',    docsController.docUpdate);
router.delete('/docs/:id', docsController.docDelete);

router.get('/s3keys', docsController.getKeys);

module.exports = router;
