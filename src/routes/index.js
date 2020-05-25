const { Router } = require('express');
const router = Router();
const autores = require('./autores.router');
const libros = require('./libros.router')

router.use('/api', autores);
router.use('/api', libros);

module.exports = router;