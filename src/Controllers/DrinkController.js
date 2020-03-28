import { prisma } from '../generated/prisma-client';
import { success, error } from '../returnFunc';

class DrinkController {
   async checkId(param) {
        let check  = false;
        await this.getDrinkById(param).then(resp => {
             switch (resp.status) {
                 case 'success':
                     check = true;
                 break;
                 case 'error' :
                     check = false;
                 break;
                 default :
                 check = false;
                 break;
             }
         });
         return check;
    }

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

    getDrinkById(id) {
        return new Promise(async (next) => {
            const Drink = await prisma.drink(id);
            if (Drink) {
                next(success(Drink));
            } else {
                next(error('No drink found for this id'));
            }
        })
    }

    addDrink(param) {
        return new Promise(async (next) => {
            if (param.price && param.name && param.oz) {
                const Drinks = await prisma.createDrink(param);
                next(success(Drinks));
            } else {
                next(success('Empty fields'));
            }
        });
    }

   async deleteDrink(param) {
        let check = this.checkId(param);

        return new Promise(async (next) => {
            if (await check) {
                const Drink = await prisma.deleteDrink(param);
                next(success('The Drink has beed deleted'));
            } else {
                next(error('No Drink with this id'));
            }
        });
    }

    async updateDrink(param) {
        return new Promise(async (next) => {
            if (param.where.id && param.data.name && param.data.oz && param.data.price) {
                const Drinks = await prisma.updateDrink(param);
                next(success(Drinks));
            } else {
                next(success('Empty fields. Please check all fields.'));
            }
        });
    }
}

export default new DrinkController();