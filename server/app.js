const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000; // El puerto donde correrá tu servidor Express

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/fundacion_apoyo', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

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

// Ruta para buscar un mandato por RUT
app.post('/api/mandates/search', async (req, res) => {
    try {
        const { rut } = req.body;
        const mandate = await Mandate.findOne({ rut });
        if (!mandate) {
            return res.json({ error: 'Mandato no encontrado' });
        }
        res.json(mandate);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para actualizar un mandato por ID
app.put('/api/mandates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = {
            day: req.body.day,
            amount: req.body.amount,
            cardDetails: req.body.cardDetails,
            cvv: req.body.cvv,
            expiryDate: req.body.expiryDate
        };
        const updatedMandate = await Mandate.findByIdAndUpdate(id, updatedFields, { new: true });
        res.json(updatedMandate);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Configurar la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta para servir el archivo registros.html
app.get('/registros', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/registros.html'));
});

// Ruta para servir el archivo editar.html
app.get('/editar', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/editar.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


