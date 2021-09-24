const express = require('express');
const router = express.Router();
const controller = require('../api/author')


router.get('/author/listar',admin, async (req, res) => {
    try {
        let result = await controller.findAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get('/author/buscar/:id',admin, async (req, res) => {
    try {
    
        let result = await controller.findById(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.post('/author/guardar',admin, async (req, res) => {
    try {
      
        let result = await controller.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.put('/author/actualizar/:id',admin, async (req, res) => {
    try {
        let result = await controller.update(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.delete('/author/borrar/:id',admin, async (req, res) => {
    try {
        let result = await controller.remove(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;