import express from 'express';
import Drink from '../Controllers/DrinkController';

export const anonymeRouteDrink = express.Router();

anonymeRouteDrink.route('/')
    .get(async (req, res) => {
        const Drinks = await Drink.getAllDrink();
        res.json(Drinks);
    })
