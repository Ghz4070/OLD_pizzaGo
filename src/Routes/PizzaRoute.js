import express from 'express';
import PizzaController from '../Controllers/PizzaController';

export const anonymeRoutePizza = express.Router();
export const adminRoutePizza = express.Router();

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
/*
anonymeRoutePizza.route('/add')
    .post(async (req, res) => {
        const pizza = {
            price: req.params.price,
            size: req.params.size,
            composition: {
                sauce : req.params.sauce,
                cheese: false 
            },
            ingredient: {
                connect: {
                    id: 'ck79bqj5g001j0739verzunk9'
                }
            },
            category: {
                connect: {
                    id: 'ck79bqmjd001t07396lyh6cj0'
                }
            }
        }
    })*/
adminRoutePizza.route('/delete/:id')
    .delete(async (req, res) => {
        const pizzaParam = {id : req.params.id};
        const deletePizza = await PizzaController.deletePizzaById(pizzaParam);
        res.json(deletePizza) ;
    })
