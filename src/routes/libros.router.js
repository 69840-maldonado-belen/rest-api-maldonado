const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const libros = require('../../libros.json');

//Mostrar libros
router.get('/libros', (req, res) =>{
    res.json(libros);
});


//Agregar libro
router.post('/libros', (req, res) =>{
    const {id, nombre, autorId} = req.body;
    if(id && nombre && autorId){
        const newLibro = {...req.body};
        libros.push(newLibro);
        res.json({'Libro': 'Agregado'});
        res.status(201);
    }else{
        res.status(400).json({'Estado': 'Error'});
    }
})


//Modificar libro por ID
router.put('/libros/:id', (req, res) => {
    const id = req.params.id;
    const {nombre, autorId} = req.body;
    console.log(nombre, autorId);

    let ban = false;
    _.each(libros, (libro) => {
        if(libro.id == id){
            libro.nombre = nombre ? nombre : libro.nombre;
            libro.autorId = autorId ? autorId : libro.autorId;
            ban = true;
        }
    });
    if (ban){
        res.json({'Modificacion': 'ok'});
    }
    else{
        res.status(400).json({'Estado': 'Error'});   
    }
});


//Borrar libro por ID
router.delete('/libros/:id', (req, res) => {
    const id = req.params.id;
    _.remove(libros, (libro) =>{
        return libro.id == id;
    });
    res.json(libros);
});

module.exports = router;