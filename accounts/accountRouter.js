const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// GET request to /api/accounts
router.get('/', async (req, res, next) => {
    try {
        res.json(await db('accounts').select())
    } catch(error) {
        next(error)
    }
});

// GET request to /api/accounts/:id
router.get('/:id', async (req, res, next) => {
    try {
        const account = await db('accounts').where('id', req.params.id).select()
        res.json(account)
    } catch (error) {
        next(error)
    }
})

// POST request to /api/accounts
router.post('/', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        const [id] = await db('accounts').insert(payload)
        res.json(await db('accounts').where('id', id).first())
    } catch(error) {
        next(error)
    }
})

// PUT request to /api/accounts/:id
router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        await db('accounts').where('id', req.params.id).update(payload)
        res.json(await db('accounts').where('id', req.params.id).first())
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res , next) => {
    try {
        await db('accounts').where('id', req.params.id).del()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = router;