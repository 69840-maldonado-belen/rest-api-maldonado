const { Router } = require('express');
const router = Router();
const _ = require('lodash');
const libros = require('../../libros.json');


const autores = require('../../autores.json');

//Mostrar autores
router.get('/autores', (req, res) =>{
    res.json(autores);
});



//Agregar autor
router.post('/autores', (req, res) =>{
    const {id, nombre, apellido} = req.body;
    if(id && nombre && apellido){
        const newAutor = {...req.body};
        autores.push(newAutor);
        res.json({'Autor': 'Agregado'});
        res.status(201);
    }else{
        res.status(400).json({'Estado': 'Error'});
    }
});


//Modificar autor por ID
router.put('/autores/:id', (req, res) => {
    const id = req.params.id;
    const {nombre, apellido} = req.body;
    console.log(nombre, apellido);
    
    let isModif = false;
    _.each(autores, (autor) => {
        if(autor.id == id){
            autor.nombre = nombre ? nombre : autor.nombre;
            autor.apellido = apellido ? apellido : autor.apellido;
            isModif = true;
        }
    });
    if (isModif){
        res.json({'Modificacion': 'ok'});
    }
    else{
        res.status(400).json({'Estado': 'Error'});
    }
});


//Borrar autor por ID
router.delete('/autores/:id', (req, res) => {
    const id = req.params.id;
    _.remove(autores, (autor) =>{
        return autor.id == id
    });
    _.remove(libros, (libro) =>{
        return libro.autorId == id;
    });
    res.json(autores);
});

module.exports = router;
