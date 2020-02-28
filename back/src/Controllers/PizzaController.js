import { prisma } from '../Providers/generated/prisma-client';
import { success, error } from '../returnFunc';
import { getPizzaCatIng } from '../Queries/GraphQLQueries';

class PizzaController {
    getAllPizza(){
        return new Promise(async (next) => {
            const Pizzas = await prisma.pizzas().$fragment(getPizzaCatIng);
            if(Pizzas.length > 0){
                next(success(Pizzas))
            }else {
                next(success('No pizza'))
            }
        })
    }
}

export default new PizzaController();