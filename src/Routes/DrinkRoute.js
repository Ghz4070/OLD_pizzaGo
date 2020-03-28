import express from 'express';
import Drink from '../Controllers/DrinkController';

export const anonymeRouteDrink = express.Router();

anonymeRouteDrink.route('/')
    .get(async (req, res) => {
        const Drinks = await Drink.getAllDrink();
        res.json(Drinks);
    })

anonymeRouteDrink.route('/add')
    .post(async (req, res) => {
        const param = {
            price: req.body.price,
            name: req.body.name,
            oz: req.body.oz
        };
        const Drinks = await Drink.addDrink(param);
        res.json(Drinks);
    })

anonymeRouteDrink.route('/delete/:id')
    .delete(async (req, res) => {
        const param = {
            id: req.params.id
        };
        const Drinks = await Drink.deleteDrink(param);
        res.json(Drinks);
    })

anonymeRouteDrink.route('/:id')
    .get(async (req, res) => {
        const param = {
            id: req.params.id
        }
        const Drinks = await Drink.getDrinkById(param);
        res.json(Drinks);
    })

anonymeRouteDrink.route('/update')
    .put(async (req, res) => {
        const param = {
            where: { id: req.body.id },
            data: {
                price: req.body.price,
                name: req.body.name,
                oz: req.body.oz
            }
        }
        const Drinks = await Drink.updateDrink(param);
        res.json(Drinks);
    })