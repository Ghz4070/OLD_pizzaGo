import express from 'express';
import PizzaController from '../Controllers/PizzaController';

export const anonymeRoutePizza = express.Router();

anonymeRoutePizza.route('/')
    .get(async (req, res) => {
        const Pizzas = await PizzaController.getAllPizza();
        res.json(Pizzas);
    })