import { assert, expect } from 'chai';
import Pizza from '../Controllers/PizzaController';

suite('Test controller Pizza', () => {
    test('should get all pizza', (done) => {
        let boolFalseStructure = false;
        let boolFalseTypeOf = false;

        const structureOjectPizza = {
            id: 'string',
            price: 'number',
            size: 'string',
            composition: 'object',
            ingredient:'object',
            category:'object'
        }

        Pizza.getAllPizza()
        .then((pizzas) => {
            const keyStructure = Object.keys(structureOjectPizza);
            for(const i in pizzas.result[0]){
                if(keyStructure.indexOf(i) === -1){
                    boolFalseStructure = true;
                }
                if(typeof(pizzas.result[0][i]) !== structureOjectPizza[i]){
                    boolFalseTypeOf = true;   
                }
            }
            
            assert.equal(boolFalseStructure, false, 'error in structure object');
            assert.equal(boolFalseTypeOf, false, 'error in typeof object key');
            assert.typeOf(pizzas,'object', 'must be an object');
            
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    test('should get one pizza by id', (done) => {
        let boolFalseStructure = false;
        let boolFalseTypeOf = false;

        const structureOjectPizza = {
            id: 'string',
            price: 'number',
            size: 'string',
            composition: 'object',
            ingredient:'object',
            category:'object'
        }

        Pizza.getPizzaById('ck7aiuh0s00750739guza8b4s')
        .then((pizza) => {
            if(pizza.result !== 'Id not found'){
               
                const keyStructure = Object.keys(structureOjectPizza);
                for(const i in pizza.result[0]){
                    if(keyStructure.indexOf(i) === -1){
                        boolFalseStructure = true;
                    }
                    if(typeof(pizza.result[0][i]) !== structureOjectPizza[i]){
                        boolFalseTypeOf = true;   
                    }

                    assert.equal(boolFalseStructure, false, 'error in structure object');
                    assert.equal(boolFalseTypeOf, false, 'error in typeof object key');
                    assert.typeOf(pizza,'object', 'must be an object');
                }
            }else {
                assert.equal(pizza.result, 'Id not found' , 'error, pizza found');
            }

        })
        .catch((err) => {
            console.log(err);
            done();
        })
        done();
    })

    test(('should get one pizza by cat'), (done) => {
        let boolFalseStructure = false;
        let boolFalseTypeOf = false;

        const structureOjectPizza = {
            id: 'string',
            price: 'number',
            size: 'string',
            composition: 'object',
            ingredient:'object',
            category:'object'
        }

        Pizza.getPizzaByCat('Deuxième classe')
        .then((pizzas) => {
            if(pizzas.status !== "error"){
                const keyStructure = Object.keys(structureOjectPizza);
                for(const i in pizzas.result[0]){
                    if(keyStructure.indexOf(i) === -1){
                        boolFalseStructure = true;
                    }
                    if(typeof(pizzas.result[0][i]) !== structureOjectPizza[i]){
                        boolFalseTypeOf = true;   
                    }
                }
            
                assert.equal(boolFalseStructure, false, 'error in structure object');
                assert.equal(boolFalseTypeOf, false, 'error in typeof object key');
                assert.typeOf(pizzas,'object', 'must be an object');
                
             
            }else {
                assert.typeOf(pizzas.result, 'string', 'got pizza');
            }

            done();
            
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })
/*
    test(('should to create a pizza'), async (done) => {
        const structureObjectPizza = {
            price: 1,
            size: 'M',
            composition: {
                tomato : true,
                cheddar: true
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
        let comparePizza = false

        const lengthPizza = await Pizza.getAllPizza();    
        await Pizza.createPizza(structureObjectPizza);
        const lengthPizzaAfterAdd = await Pizza.getAllPizza();

        if(lengthPizza.length < lengthPizzaAfterAdd.length) {
            comparePizza = true;
        }
        
        assert.equal(comparePizza, true, 'Pizza isnt added');
        done();
        
    })*/

    test(('should to delete a pizza'), (done) => {
        (async() => {
            let compteur = true; 
            const paramDeletePizza = {id: "ck7aiuh02006y0739tg4b8gkt"};

            const lengthPizza = await Pizza.getAllPizza();    
            const deletePizza = await Pizza.deletePizzaById(paramDeletePizza);
            const lengthPizzaAfterDelete = await Pizza.getAllPizza();
            

            if(lengthPizza.result !== "No pizza" && lengthPizzaAfterDelete.result !== "No pizza"){
                if(lengthPizza.length >= lengthPizzaAfterDelete){
                    compteur = false;
                }

                assert.equal(compteur, true, "has not been deleted");
                assert.typeOf(paramDeletePizza, "object", "Bad parameter");
            }else {
                assert.equal(deletePizza.result, "Pizza not found", "error pizza");
            }
            
        })(); 
        done();
    })

})