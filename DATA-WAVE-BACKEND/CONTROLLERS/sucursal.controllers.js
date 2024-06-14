const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de sucursal');
    db.sucursal.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

exports.listafull = (req,res) =>{
    console.log('Procesamiento de sucursale con departamentos');//no se esta utilizando
    // buscar la lista de usuarios
    db.sucursal.findAll({include:db.sucursal}) 
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
  };

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de sucursal filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de sucursal
    db.sucursal.findAll({ where: { [campo]: valor } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nueva sucursal');
    console.log(req.body.descripcion); // Cambiar de req.body.descripcion a req.body.descripcion
    const datanuevosucursal = {   
        descripcion: req.body.descripcion, // Cambiar de descripcion a descripcion
    };
    db.sucursal.create(datanuevosucursal)
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
    console.log('Actualizar sucursal');
    console.log(req.body.id);

    const datasucursal = {
        descripcion: req.body.descripcion,
    };
    db.sucursal.update(datasucursal, {
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true,
                        msg: 'Sucursal actualizada correctamente'
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo actualizar la sucursal',
                        body: {
                            data: datasucursal,
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
    db.sucursal.destroy({
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
                        msg: 'No se pudo eliminar la sucursal',
                        body: {
                            data: datasucursal,
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
    db.sucursal.findAndCountAll({limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }else{
        db.sucursal.findAndCountAll({where: {descripcion: {
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