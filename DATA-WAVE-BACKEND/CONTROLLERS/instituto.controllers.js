const db = require('../MODELS');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = async (req, res) => {
    console.log('Procesamiento de lista de Institutos con paginación');
    const page = parseInt(req.query.page, 10) || 1;
    console.log(page, 'Procesamiento de lista de Institutos con paginación');
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
        const registros = await db.instituto.findAll({ limit, offset });
        res.status(200).send(registros);
    } catch (error) {
        console.error('Error al obtener la lista de Institutos con paginación:', error);
        res.status(500).send(error);
    }
};

exports.listaquery = async (req, res) => {
    console.log('Procesamiento de lista de Institutos full con paginación');
    const page = parseInt(req.params.pag, 10) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
        const registros = await sequelize.query(
            `
            SELECT i.cue, i.ee, i.denominacion, i.cuesede,
                t.id as id_tipo, t.descripcion as instituto, 
                c.id as id_ciudad, c.nombre as ciudad,
                d.id as id_dpto, d.nombre as departamento,
                s.id as id_sucursal, s.descripcion as sucursal
            FROM instituto i
                INNER JOIN tipoinstituto t ON i.tipoinstitutoId = t.id
                INNER JOIN ciudad c ON i.CiudadId=c.id
                INNER JOIN sucursal s ON i.sucursalId=s.id
                INNER JOIN departamento d ON c.departamentoId=d.id
            ORDER BY i.cue
            LIMIT :limit
            OFFSET :offset
        `,
            { 
                type: sequelize.QueryTypes.SELECT,
                replacements: { limit, offset }
            }
        );
        const totalCount = await sequelize.query(
            `SELECT COUNT(*) as total FROM instituto`,
            { type: sequelize.QueryTypes.SELECT }
        );
        const totalRecords = totalCount[0].total;
        const totalPages = Math.ceil(totalRecords / limit);

        res.status(200).send({ registros, totalPages });
    } catch (error) {
        console.error('Error al obtener la lista completa de Institutos con tipo y sucursal con paginación:', error);
        res.status(500).send({ error: 'Error al obtener la lista completa de Institutos con Ofertas con paginación' });
    }
};

// lista con query con filtrado
exports.listaqueryfiltro = async (req, res) => {
    try {
        const { cue } = req.query;
        let query = `
            SELECT i.cue, i.ee, i.denominacion, i.cuesede,
                t.descripcion as tipo_instituto, c.nombre as ciudad, s.descripcion as sucursal
            FROM instituto i 
            INNER JOIN tipoinstituto t ON i.tipoinstitutoId = t.id 
            INNER JOIN ciudad c ON i.CiudadId = c.id 
            INNER JOIN sucursal s ON i.sucursalId = s.id
        `;
        if (cue) {
            query += ' WHERE i.cue = :cue';
        }
        query += ' ORDER BY i.cue';
        const registros = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: cue ? { cue } : {},
        });
        res.status(200).send(registros);
    } catch (error) {
        console.error('Error al obtener la lista de Institutos', error);
        res.status(500).send({ error: 'Error al obtener la lista de Institutos' });
    }
};

//-----------------------------------listafull
exports.listafull = (req, res) => {
    console.log('Procesamiento de lista de Institutos full');
    db.instituto.findAll({ include: db.tipoinstituto })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de instituto filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`);
    db.instituto.findAll({
        where: {
            [campo]: {
                [Op.like]: `%${valor}%`
            }
        }
    })
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        res.status(500).send(error);
    });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nuevo instituto');
    console.log(req.body.denominacion);
    const datanuevoinstituto = {
        cue: req.body.cue,
        ee: req.body.ee,
        denominacion: req.body.denominacion,
        cuesede: req.body.cuesede,
        tipoinstitutoId: req.body.tipoinstitutoId,
        CiudadId: req.body.CiudadId,
        sucursalId: req.body.sucursalId
    };
    db.instituto.create(datanuevoinstituto)
        .then(registro => {
            res.status(201).send({ resultado: true, data: registro });
        })
        .catch(error => {
            res.status(500).send({ resultado: false, msg: error });
        });
};

//-------------------------------------actualizar
exports.actualizar = (req, res) => {
    const cue = req.params.cue;
    console.log('Actualizar Instituto');
    const datanuevoinstituto = {
        ee: req.body.ee,
        denominacion: req.body.denominacion,
        cuesede: req.body.cuesede,
        tipoinstitutoId: req.body.tipoinstitutoId,
        CiudadId: req.body.CiudadId,
        sucursalId: req.body.sucursalId
    };
    console.log('Data a actualizar:', datanuevoinstituto);
    db.instituto.update(datanuevoinstituto, { where: { cue: cue } })
        .then(num => {
            if (num > 0) {
                res.status(201).send({ resultado: true, msg: 'Instituto actualizado correctamente' });
            } else {
                res.status(500).send({
                    resultado: false,
                    msg: 'No se pudo actualizar el Instituto',
                    body: { data: datanuevoinstituto, cue: cue }
                });
            }
        })
        .catch(error => {
            res.status(501).send({ resultado: false, msg: error });
        });
};

//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const cue = req.params.cue;
    db.instituto.destroy({ where: { cue: cue } })
        .then(num => {
            if (num > 0) {
                res.status(200).send({ resultado: true, msg: 'Instituto eliminado correctamente' });
            } else {
                res.status(404).send({
                    resultado: false,
                    msg: 'No se pudo encontrar el Instituto',
                    body: { cue: cue }
                });
            }
        })
        .catch(error => {
            console.error('Error al eliminar el Instituto:', error);
            res.status(500).send({ resultado: false, msg: 'Error al eliminar el Instituto', error: error.message });
        });
};

//-----------------------------------listaPag
exports.listaPag = (req, res) => {
    console.log('Procesamiento de lista filtrada por pagina');
    let pag = parseInt(req.params.pag, 10) || 1;
    const text = req.query.text || "";
    const limit = 5;
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`);
    const whereCondition = text ? { denominacion: { [Op.like]: `%${text}%` } } : {};
    db.instituto.findAndCountAll({ where: whereCondition, limit, offset })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};