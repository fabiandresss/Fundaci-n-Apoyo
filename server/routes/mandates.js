// server/routes/mandates.js
const express = require('express');
const router = express.Router();
const Mandate = require('../models/Mandate');

router.post('/', async (req, res) => {
    const newMandate = new Mandate(req.body);
    try {
        await newMandate.save();
        res.status(201).send(newMandate);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
