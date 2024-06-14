const db = require('../MODELS');
const sequelize = db.sequelize;
const {Op} = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de Oferta');
    db
        .oferta
        .findAll()
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            console.error('Error al obtener la lista de ofertas:', error);
            res
                .status(500)
                .send({error: 'Error al obtener la lista de ofertas'});
        });
};

//-----------------------------------listafull
exports.listafull = (req, res) => {
    console.log('Procesamiento de lista de Ofertas full');
    db
        .oferta
        .findAll({include: db.cohorte})
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            res
                .status(500)
                .send(error);
        });
};

exports.listafullquery = async (req, res) => {
    console.log('Procesamiento de lista de Ofertas full');
    try {
        const registros = await sequelize.query(
            ` Select * from v_oferta_full `,
            {type: sequelize.QueryTypes.SELECT}
        );
        res
            .status(200)
            .send(registros);
    } catch (error) {
        console.error(
            'Error al obtener la lista completa de Ofertas Cohorte con Tipo Apertura:',
            error
        );
        res
            .status(500)
            .send({error: 'Error al obtener la lista completa de Ofertas'});
    }
};

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de oferta filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // aqui adecue usando op.like ya que tengo oferta con nombre similares en la
    // cedena de texto del campo
    db
        .oferta
        .findAll({
            where: {
                [campo]: {
                    [Op.like]: `%${valor}%`
                }
            }
        })
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            console.error('Error al filtrar las ofertas:', error);
            res
                .status(500)
                .send({error: 'Error al filtrar las ofertas'});
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nueva oferta');
    console.log(req.body.nombre);
    const datanuevooferta = {
        resolucion: req.body.resolucion,
        nombre: req.body.nombre,
        sector: req.body.sector,
        descripcion: req.body.descripcion
    };
    db
        .oferta
        .create(datanuevooferta)
        .then(registro => {
            res
                .status(201)
                .send({resultado: true, data: registro});
        })
        .catch(error => {
            console.error('Error al crear la oferta:', error);
            res
                .status(500)
                .send({error: 'Error al crear la oferta'});
        });
};

//-------------------------------------actualizar
exports.actualizar = (req, res) => {
    const cue = req.params.id; // Usar req.params.id como cue
    console.log('Actualizar oferta');
    console.log(req.body.id);

    const datanuevooferta = {
        resolucion: req.body.resolucion,
        nombre: req.body.nombre,
        sector: req.body.sector,
        descripcion: req.body.descripcion
    };
    db
        .oferta
        .update(datanuevooferta, {
            where: {
                cue: cue
            }
        })
        .then(num => {
            if (num > 0) {
                res
                    .status(201)
                    .send({resultado: true, msg: 'Oferta actualizado correctamente'});
            } else {
                res
                    .status(500)
                    .send({
                        resultado: false,
                        msg: 'No se pudo actualizar la oferta',
                        body: {
                            data: datanuevooferta,
                            cue: cue
                        }
                    });
            }
        })
        .catch(error => {
            console.error('Error al actualizar la oferta:', error);
            res
                .status(501)
                .send({error: 'Error al actualizar la oferta'});
        });
};
//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const cue = req.params.cue;
    db
        .oferta
        .destroy({
            where: {
                cue: cue
            }
        })
        .then(num => {
            if (num > 0) {
                res
                    .status(201)
                    .send({resultado: true});
            } else {
                res
                    .status(500)
                    .send({
                        resultado: false,
                        msg: 'No se pudo eliminar el Oferta',
                        body: {
                            cue: cue
                        }
                    });
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(501)
                .send({resultado: false, msg: error});
        });
};

//-----------------------------------listaPag
exports.listaPag = (req, res) => {
    console.log('Procesamiento de lista filtrada por pagina');
    let pag = req.params.pag;
    const text = req.params.text;
    if (!pag) {
        pag = 1;
    }
    const limit = 3; // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)
    // buscar la lista
    if (!text) {
        db
            .oferta
            .findAndCountAll({
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(registros => {
                res
                    .status(200)
                    .send(registros);
            })
            .catch(error => {
                res
                    .status(500)
                    .send(error);
            });
    } else {
        db
            .oferta
            .findAndCountAll({
                where: {
                    denominacion: {
                        [Op.like]: `%${text}%`
                    }
                },
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(registros => {
                res
                    .status(200)
                    .send(registros);
            })
            .catch(error => {
                res
                    .status(500)
                    .send(error);
            });
    }
};


//---------------------------------------------------------
exports.listaOfertaUnicaPag = (req, res) => {
    console.log('Procesamiento de lista de ofertas filtrada por página');
    let pag = parseInt(req.params.pag) || 1;
    const text = req.params.text || '';
    const limit = 4; // número de registros por página
    const offset = (pag - 1) * limit;
    console.log(`Página: ${pag}, Texto: ${text}`);

    let query = `
        SELECT *
        FROM v_ofertaunica v
        ORDER BY v.nombre ASC
        LIMIT :limit
        OFFSET :offset
    `;

    let countQuery = `
        SELECT COUNT(*) AS count
        FROM v_ofertaunica v
    `;

    let replacements = { limit, offset };

    if (text) {
        const whereClause = `WHERE v.denominacion LIKE :text`;
        replacements.text = `%${text}%`;

        query = `
            SELECT *
            FROM v_ofertaunica v
            ${whereClause}
            ORDER BY v.nombre ASC
            LIMIT :limit
            OFFSET :offset
        `;

        countQuery = `
            SELECT COUNT(*) AS count
            FROM v_ofertaunica v
            ${whereClause}
        `;
    }

    db.sequelize.query(query, { replacements, type: db.sequelize.QueryTypes.SELECT })
        .then(registros => {
            db.sequelize.query(countQuery, { replacements, type: db.sequelize.QueryTypes.SELECT })
                .then(countResult => {
                    const count = countResult[0].count;
                    const response = {
                        registros,
                        count,
                        currentPage: pag,
                        totalPages: Math.ceil(count / limit)
                    };
                    res.status(200).send(response);
                })
                .catch(error => {
                    console.error('Error al obtener el conteo:', error);
                    res.status(500).send(error);
                });
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
            res.status(500).send(error);
        });
};