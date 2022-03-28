const { Router } = require('express');
const router = Router();
var fs = require('fs');
const path = require('path');


router.get('/:tipo/:img', (req, res, next) => {
    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImagen = path.join( __dirname, `../uploads/`, tipo, img );

    fs.exists(pathImagen, existe => {

        if (!existe) {
            pathImagen = path.join( __dirname, `../assets/`, 'no-img.jpg' );
        }

        res.sendFile(pathImagen);

    });

});

module.exports = router;