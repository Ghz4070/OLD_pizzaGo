import { prisma } from '../providers/generated/prisma-client';
import { success, error } from '../returnFunc';

class DrinkController {
    getAllDrink() {
        return new Promise(async (next) => {
            const Drinks = await prisma.drinks()
            if (Drinks.length > 0) {
                next(success(Drinks));
            } else {
                next(success('no drink'));
            }
        })
    }

    addDrink(param) {
        return new Promise(async (next) => {
            const Drinks = await prisma.createDrink(param);
            if (param.price && param.name && param.oz) {
                next(success(Drinks));
            } else {
                next(success('no drink'));
            }
        });
    }
}

export default new DrinkController();