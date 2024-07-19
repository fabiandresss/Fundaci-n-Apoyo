// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Asegúrate de importar path
const app = express();
const port = 3000; // El puerto donde correrá tu servidor Express

// Conexión a MongoDB en el puerto 5000
mongoose.connect('mongodb://localhost:27017/fundacion_apoyo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definición del esquema y modelo
const mandateSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    rut: String,
    phone: String,
    day: String,
    amount: Number,
    cardDetails: String,
    cvv: String,
    expiryDate: String
});

const Mandate = mongoose.model('Mandate', mandateSchema);

// Ruta para obtener todos los mandatos
app.get('/api/mandates', async (req, res) => {
    try {
        const mandates = await Mandate.find();
        res.json(mandates);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Configurar la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para servir el archivo registros.html
app.get('/registros', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/registros.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
