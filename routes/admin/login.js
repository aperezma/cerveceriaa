var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

module.exports = router;
router.post ('/', async function(req, res, next) {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id,
      req.session.nombre = data.usuario,
      res.redirect ('/admin/novedades/')
    } else {
      res.render ('admin/login', {
        layout: 'admin/layout',
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
})

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout',
  });
});
