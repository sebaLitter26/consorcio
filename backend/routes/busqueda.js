const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { 
    busquedaGeneral,
    busquedaColeccion 
} = require('../controllers/busquedas');


// ==============================
// Busqueda por colección
// ==============================
router.get('/coleccion/:tabla/:busqueda', busquedaColeccion );


// ==============================
// Busqueda general
// ==============================
router.get('/todo/:busqueda', busquedaGeneral);


module.exports = router;