import express from 'express';
import Dessert from '../Controllers/DessertController';

export const anonymeRouteDessert = express.Router();

// GET
anonymeRouteDessert.route('/')
    .get(async (req, res) => {
        const Desserts = await Dessert.getAllDessert();
        res.json(Desserts);
    })

// GET by id
anonymeRouteDessert.route('/:id')
    .get(async (req, res) => {
        const param = {
            id: req.params.id
        }
        const Desserts = await Dessert.getDessertById(param);
        res.json(Desserts);
    })

// POST
anonymeRouteDessert.route('/add')
    .post(async (req, res) => {
        const param = {
            price: req.body.price,
            name: req.body.name
        };
        const Desserts = await Dessert.addDessert(param);
        res.json(Desserts);
    })

// DELETE    
anonymeRouteDessert.route('/delete/:id')
    .delete(async (req, res) => {
        const param = {
            id: req.params.id
        };
        const Desserts = await Dessert.deleteDessert(param);
        res.json(Desserts);
    })

// PUT    
anonymeRouteDessert.route('/update')
    .put(async (req, res) => {
        const param = {
            where: { id: req.body.id },
            data: {
                price: req.body.price,
                name: req.body.name
            }
        }
        const Desserts = await Dessert.updateDessert(param);
        res.json(Desserts);
    })