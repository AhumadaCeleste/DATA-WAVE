const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de ciudad');
    db.ciudad.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

exports.listafull = (req,res) =>{
    console.log('Procesamiento de cuidades con departamentos');
    // buscar la lista de usuarios
    db.ciudad.findAll({include:db.departamento}) 
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
  };

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de ciudad filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de ciudad
    db.ciudad.findAll({ where: { [campo]: valor } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nueva ciudad');
    console.log(req.body.nombre); // Cambiar de req.body.descripcion a req.body.nombre
    const datanuevociudad = {   
        nombre: req.body.nombre, // Cambiar de descripcion a nombre
    };
    db.ciudad.create(datanuevociudad)
        .then(registro => {
            res.status(201).send(
                {
                    resultado: true,
                    data: registro
                }
            );
        })
        .catch(error => {
            res.status(500).send(
                {
                    resultado: false,
                    msg: error
                }
            );
        });
};

//-------------------------------------actualizar
exports.actualizar = (req, res) => {
    const id = req.params.id;
    console.log('Actualizar ciudad');
    console.log(req.body.id);

    const dataciudad = {
        nombre: req.body.nombre,
    };
    db.ciudad.update(dataciudad, {
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true,
                        msg: 'Ciudad actualizado correctamente'
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo actualizar la ciudad',
                        body: {
                            data: dataciudad,
                            id: id
                        }
                    }
                );
            }
        })
        .catch(error => {
            res.status(501).send(
                {
                    resultado: false,
                    msg: error
                }
            );
        });
};

//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const id = req.params.id;
    db.ciudad.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo eliminar la ciudad',
                        body: {
                            data: dataciudad,
                            id: id
                        }
                    }
                );
            }
        })
        .catch(error => {
            console.log(error);
            res.status(501).send(
                {
                    resultado: false,
                    msg: error
                }
            );
        });
};

//-----------------------------------listaPag
exports.listaPag = (req,res) =>{
    console.log('Procesamiento de lista filtrada por pagina');
    const pag = req.params.pag;
    const text = req.params.text;
    if(!pag) {pag = 1;}
    const limit = 3;   // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)
    // buscar la lista
    if (!text){
    db.ciudad.findAndCountAll({limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }else{
        db.ciudad.findAndCountAll({where: {nombre: {
            [Op.like]: `%${text}%`
        }}, limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }
};