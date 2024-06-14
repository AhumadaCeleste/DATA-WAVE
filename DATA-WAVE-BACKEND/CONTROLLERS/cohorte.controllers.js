const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de cohortes');
    db.cohorte.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

exports.listafull = (req,res) =>{
    console.log('Procesamiento de cohortes con tipo de apertura');
    // buscar la lista de usuarios
    db.cohorte.findAll({include:db.tipoapertura}) 
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
  };

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de cohorte filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de cohorte
    db.cohorte.findAll({ where: { [campo]: valor } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nueva cohorte');
    console.log(req.body.nombre); // Cambiar de req.body.descripcion a req.body.nombre
    const datanuevocohorte = {   
        desde: req.body.desde,
        hasta: req.body.hasta, 
    };
    db.cohorte.create(datanuevocohorte)
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
    console.log('Actualizar cohorte');
    console.log(req.body.id);

    const datacohorte = {
        nombre: req.body.nombre,
    };
    db.cohorte.update(datacohorte, {
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true,
                        msg: 'Cohorte actualizada correctamente'
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo actualizar la cohorte',
                        body: {
                            data: datacohorte,
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
    db.cohorte.destroy({
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
                        msg: 'No se pudo eliminar la cohorte',
                        body: {
                            data: datacohorte,
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
    db.cohorte.findAndCountAll({limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }else{
        db.cohorte.findAndCountAll({where: {nombre: {
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