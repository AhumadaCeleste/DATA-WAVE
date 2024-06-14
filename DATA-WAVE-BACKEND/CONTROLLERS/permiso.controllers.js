const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de permiso');
    db.permiso.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de permiso filtrado');
    const valor = req.params.valor;
    console.log(`Valor: ${valor}`);
    // buscar la lista de permiso
    db.permiso.findAll({ where: { palabraclave: valor } })
        .then(registros => {
            console.log(db.permiso.findAll({ where: { palabraclave: valor } }).toString());
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nuevo permiso');
    console.log(req.body.descripcion);
    const datanuevopermiso = {   
        descripcion: req.body.descripcion,
        palabraclave: req.body.palabraclave,
    };
    db.permiso.create(datanuevopermiso)
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
    console.log('Actualizar permiso,');
    console.log(req.body.id);

    const datapermiso = {
        descripcion: req.body.descripcion,
        palabraclave: req.body.palabraclave,
    };
    db.permiso.update(datapermiso, {
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true,
                        msg: 'Permiso actualizado correctamente'
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo actualizar el Permiso',
                        body: {
                            data: datapermiso,
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
    db.permiso.destroy({
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
                        msg: 'No se pudo eliminar el permiso',
                        body: {
                            data: datapermiso,
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
exports.listaPag = (req, res) => {
    console.log('Procesamiento de lista filtrada por página');
    let pag = parseInt(req.params.pag); // Convertir a número entero
    let text = req.params.text;
    if (!pag || pag < 1) { pag = 1; } // Si pag no es válido, establecer en 1
    const limit = 3;
    const offset = (pag - 1) * limit;
    console.log(`Página: ${pag}, Texto: ${text}`);

    // buscar la lista de permisos
    if (!text) {
        db.permiso.findAndCountAll({ limit: limit, offset: offset, order: [['id', 'ASC']] })
            .then(registros => {
                res.status(200).send(registros);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    } else {
        db.permiso.findAndCountAll({
            where: { descripcion: { [Op.like]: `%${text}%` } },
            limit: limit,
            offset: offset,
            order: [['id', 'ASC']]
        })
            .then(registros => {
                res.status(200).send(registros);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
};

//-----------------------------------permisoUsuario
exports.permisosUsuario = (req, res) => {
    const usuarioId = req.params.usuarioId;

    db.usuario.findByPk(usuarioId, {
        include: {
            model: db.rol,
            include: {
                model: db.permisoxrol,
                include: {
                    model: db.permiso
                }
            }
        }
    })
        .then(usuario => {
            if (!usuario) {
                res.status(404).send({ message: 'Usuario no encontrado' });
                return;
            }

            const permisos = usuario.roles.reduce((acc, rol) => {
                return acc.concat(rol.permisos.map(permiso => permiso.descripcion));
            }, []);

            res.status(200).send(permisos);
        })
        .catch(error => {
            res.status(500).send({ message: error.message || 'Error al obtener los permisos del usuario' });
        });
};