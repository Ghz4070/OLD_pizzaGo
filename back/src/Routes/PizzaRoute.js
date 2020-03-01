import express from 'express';
import PizzaController from '../Controllers/PizzaController';

export const anonymeRoutePizza = express.Router();

anonymeRoutePizza.route('/')
    .get(async (req, res) => {
        const Pizzas = await PizzaController.getAllPizza();
        res.json(Pizzas);
    })
anonymeRoutePizza.route('/:id')
    .get(async (req, res) => {
        const Pizza = await PizzaController.getPizzaById(req.params.id);
        res.json(Pizza);
    })
anonymeRoutePizza.route('/category/:cat')
    .get(async (req, res) => {
        const Pizza = await PizzaController.getPizzaByCat(req.params.cat);
        res.json(Pizza);
    })