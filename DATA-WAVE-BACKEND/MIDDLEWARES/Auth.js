const jwt = require('jsonwebtoken');
const llave = "Millave123456$" // llave para firmar el token

module.exports = (req, res, next) => {
    const headerAuth = req.headers.authorization;
    if (!headerAuth) {
        return res.status(401).send({ error: 'No se ha proporcionado token de acceso' });
    }else{
        const token = headerAuth.split(' ')[1]; //BEARER
        jwt.verify(token, llave, (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: 'Token inválido' });
            }else{
                req.decoded = decoded; // información decodificada del token
                next();
            }
        });
    }
}