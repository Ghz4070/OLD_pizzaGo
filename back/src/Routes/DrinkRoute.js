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
