const db = require('../MODELS');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

// Retornar todos los ofertaxinstituto
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de Oferta por Instituto');
    db.ofertaxinstituto.findAll({
        include: [{
            model: db.oferta,
            attributes: ['nombre']
        }]
    })
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        console.error('Error al obtener lista de Oferta por Instituto:', error);
        res.status(500).send({ error: 'Error al obtener lista de Oferta por Instituto' });
    });
};

exports.obtenerDetalleOfertaPorInstituto = async (req, res) => {
    const institutoId = req.params.institutoId;
    try {
        const registros = await sequelize.query(
            `SELECT * FROM v_instituto_oferta_matricula WHERE institutoCue = :institutoId`,
            {
                replacements: { institutoId: institutoId },
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (registros.length > 0) {
            res.status(200).send(registros[0]);
        } else {
            res.status(404).send({ message: 'No se encontraron detalles para el instituto especificado' });
        }
    } catch (error) {
        console.error('Error al obtener el detalle de ofertas por instituto:', error);
        res.status(500).send({ error: 'Error al obtener el detalle de ofertas por instituto' });
    }
};

// Filtrar ofertaxinstituto
exports.filtrar = (req, res) => {
    console.log('Procesamiento de oferta filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`);
    db.OfertaXInstituto.findAll({
        include: [{
            model: db.oferta,
            where: { [campo]: { [Op.like]: `%${valor}%` } }
        }]
    })
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        console.error('Error al filtrar las ofertas x Instituto:', error);
        res.status(500).send({ error: 'Error al filtrar las ofertas' });
    });
};

// Vista v_instituto_oferta_matricula
exports.listaInstitutoOfertaMatricula = async (req, res) => {
    console.log('Procesamiento de lista de Instituto, Oferta y Matrícula');
    try {
        const registros = await sequelize.query(
            `SELECT * FROM v_instituto_oferta_matricula`,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.status(200).send(registros);
    } catch (error) {
        console.error('Error al obtener la lista completa de Instituto, Oferta y Matrícula:', error);
        res.status(500).send({ error: 'Error al obtener la lista completa de Instituto, Oferta y Matrícula' });
    }
};

// Crear nueva ofertaxinstituto
exports.nuevo = (req, res) => {
    console.log('Nueva oferta por instituto');
    const datanuevoofertaxinstituto = {
        institutoCue: req.body.institutoCue,
        ofertumId: req.body.ofertumId,
        matricula: req.body.matricula,
        matricula2: req.body.matricula2,
        matricula3: req.body.matricula3,
    };
    db.ofertaxinstituto.create(datanuevoofertaxinstituto)
    .then(registro => {
        res.status(201).send({
            resultado: true,
            data: registro
        });
    })
    .catch(error => {
        console.error('Error al crear la oferta por instituto:', error);
        res.status(500).send({ error: 'Error al crear la oferta por instituto' });
    });
};

// Actualizar ofertaxinstituto
exports.actualizar = (req, res) => {
    const id = req.params.id;
    console.log('Actualizar oferta por instituto');
    const dataActualizada = {
        institutoCue: req.body.institutoCue,
        ofertumId: req.body.ofertumId,
        matricula: req.body.matricula,
        matricula2: req.body.matricula2,
        matricula3: req.body.matricula3,
    };
    db.ofertaxinstituto.update(dataActualizada, {
        where: { id: id }
    })
    .then(num => {
        if (num > 0) {
            res.status(201).send({
                resultado: true,
                msg: 'Oferta por instituto actualizada correctamente'
            });
        } else {
            res.status(500).send({
                resultado: false,
                msg: 'No se pudo actualizar la oferta por instituto',
                body: {
                    data: dataActualizada,
                    id: id
                }
            });
        }
    })
    .catch(error => {
        console.error('Error al actualizar la oferta por instituto:', error);
        res.status(501).send({ error: 'Error al actualizar la oferta por instituto' });
    });
};

// Eliminar ofertaxinstituto
exports.eliminar = (req, res) => {
    const id = req.params.id;
    db.ofertaxinstituto.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num > 0) {
            res.status(201).send({
                resultado: true
            });
        } else {
            res.status(500).send({
                resultado: false,
                msg: 'No se pudo eliminar la oferta por instituto',
                body: {
                    id: id
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

// Retornar ofertas por instituto
exports.listaPorInstituto = (req, res) => {
    console.log('Procesamiento de lista de ofertas por instituto');
    const institutoId = req.params.institutoId;
    db.ofertaxinstituto.findAll({
        where: { institutoCue: institutoId },
        include: [{
            model: db.oferta,
            attributes: ['nombre']
        }]
    })
    .then(ofertas => {
        res.status(200).send(ofertas);
    })
    .catch(error => {
        console.error('Error al obtener lista de ofertas por instituto:', error);
        res.status(500).send({ error: 'Error al obtener lista de ofertas por instituto' });
    });
};