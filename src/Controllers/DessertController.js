import { prisma } from '../generated/prisma-client';
import { success, error } from '../returnFunc';

class DessertController {
    getAllDessert() {
        return new Promise(async (next) => {
            const Desserts = await prisma.desserts()
            if (Desserts.length > 0) {
                next(success(Desserts));
            } else {
                next(success('no Dessert'));
            }
        })
    }

    getDessertById(id) {
        return new Promise(async (next) => {
            const Dessert = await prisma.dessert(id);
            if (Dessert) {
                next(success(Dessert));
            } else {
                next(error('No Dessert found for this id'));
            }
        })
    }

    addDessert(param) {
        return new Promise(async (next) => {
            if (param.price && param.name) {
                const Desserts = await prisma.createDessert(param);
                next(success(Desserts));
            } else {
                next(success('Empty fields'));
            }
        });
    }

    async deleteDessert(param) {
        let check = this.checkId(param);

        return new Promise(async (next) => {
            if (await check) {
                const Dessert = await prisma.deleteDessert(param);
                next(success('The Dessert has beed deleted'));
            } else {
                next(error('No Dessert with this id'));
            }
        });
    }

    async updateDessert(param) {
        return new Promise(async (next) => {
            if (param.where.id && param.data.name && param.data.price) {
                const Desserts = await prisma.updateDessert(param);
                next(success(Desserts));
            } else {
                next(success('Empty fields. Please check all fields.'));
            }
        });
    }
}

export default new DessertController();