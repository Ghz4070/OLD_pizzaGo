import { prisma } from '../Providers/generated/prisma-client';
import { success, error } from '../returnFunc';
import { getPizzaCatIng, getPizzaByCat } from '../Queries/GraphQLQueries';

class PizzaController {
    getAllPizza(){
        return new Promise(async (next) => {
            const Pizzas = await prisma.pizzas().$fragment(getPizzaCatIng);
            if(Pizzas.length > 0){
                next(success(Pizzas));
            }else {
                next(success('No pizza'));
            }
        })
    }

    getPizzaById(id){
        return new Promise(async (next) => {
            const Pizza = await prisma.pizza({id: id}).$fragment(getPizzaCatIng);
            if(Pizza){
                next(success(Pizza));
            }else {
                next(error('Id not found'));
            }
        })
    }

    getPizzaByCat(cat){
        return new Promise(async (next) => {
            const Pizzas = await prisma.$graphql(getPizzaByCat(cat));
            if(Pizzas){
                next(success(Pizzas));
            }else {
                next(error('This category doesnt have pizza'));
            }
        })
        
    }
}

export default new PizzaController();