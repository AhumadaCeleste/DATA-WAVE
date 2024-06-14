const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de los tipos de Institutos');
    db.tipoinstituto.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de tipos de instituto filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    db.tipoinstituto.findAll({ where: { [campo]: { [Op.like]: `%${valor}%` } } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nuevo tipo de instituto');
    console.log(req.body.denominacion);
    const datanuevotipoinstituto = {
        descripcion: req.body.descripcion,
    };
    db.tipoinstituto.create(datanuevotipoinstituto)
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
    const cue = req.params.id; // Usar req.params.id como cue
    console.log('Actualizar tipo de Instituto');
    console.log(req.body.id);

    const datanuevotipoinstituto = {
        descripcion: req.body.descripcion,
    };
    db.tipoinstituto.update(datanuevotipoinstituto, {
        where: { cue: cue }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send({
                    resultado: true,
                    msg: 'Instituto actualizado correctamente'
                });
            } else {
                res.status(500).send({
                    resultado: false,
                    msg: 'No se pudo actualizar el Instituto',
                    body: {
                        descripcion: req.body.descripcion,
                      
                    }
                });
            }
        })
        .catch(error => {
            res.status(501).send({
                resultado: false,
                msg: error
            });
        });
};

//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const cue = req.params.cue;
    db.tipoinstituto.destroy({
        where: { cue: cue }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send({
                    resultado: true
                });
            } else {
                res.status(500).send({
                    resultado: false,
                    msg: 'No se pudo eliminar el tipo de Instituto',
                    body: {
                        cue: cue
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(501).send({
                resultado: false,
                msg: error
            });
        });
};

//-----------------------------------listaPag
exports.listaPag = (req,res) =>{
    console.log('Procesamiento de lista filtrada por pagina');
    let pag = req.params.pag || 1;
    const text = req.params.text || "";
    const limit = 3;   // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)
    
    const whereCondition = text ? { descripcion: { [Op.like]: `%${text}%` } } : {};

    db.tipoinstituto.findAndCountAll({ where: whereCondition, limit: limit, offset: offset, order: [['id', 'ASC']] })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};