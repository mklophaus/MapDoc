var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');
var docsController =    require('../controllers/docs');

// root path:
router.get('/', welcomeController.index);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

///DOCS ROUTES
router.get('/docs/:id',    docsController.docShow);
router.get('/docs',       docsController.docIndex);
router.post('/docs',      docsController.docCreate);
router.put('/docs/:id',    docsController.docUpdate);
router.delete('/docs/:id', docsController.docDelete);

router.get('/s3keys', docsController.getKeys);

module.exports = router;
