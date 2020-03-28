import { prisma } from '../generated/prisma-client';
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
            if(Pizzas.pizzas.length > 0){
                next(success(Pizzas));
            }else {
                next(error('This category doesnt have pizza'));
            }
        })
    }
    /* a refaire
    createPizza(pizza){
        return new Promise(async (next) => {
            if(pizza.price && pizza.size && pizza.composition && pizza.ingredient && pizza.category) {
                const addPizza = await prisma.createPizza(pizza);
                next(success(addPizza));
            }else {
                next(error('Empty fields'));
            }
        })
    }*/

    async deletePizzaById(pizzaId){
        return new Promise(async (next) => {
            const check = await this.checkPizzaExist(pizzaId);
            if(check){
                const deletePizza = await prisma.deletePizza(pizzaId);
                next(success('Pizza has been deleted'));
            }else{
                next(error('Pizza not found'));
            }
        })
    }

    checkPizzaExist(pizzaId){
        return new Promise(async (next) => {
            const checkpizza = await prisma.pizza(pizzaId);
            if(checkpizza){
                next(true);
            }else{
                next(false);
            }
        })
    }


}


export default new PizzaController();