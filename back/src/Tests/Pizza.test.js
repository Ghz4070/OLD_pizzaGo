import { assert } from 'chai';
import Pizza from '../Controllers/PizzaController';

suite('Test controller Pizza', () => {
    test('should get all pizza', (done) => {
        let boolFalseStructure = false;
        let boolFalseTypeOf = false

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
            
            assert.equal(boolFalseStructure, false, 'error in structure object')
            assert.equal(boolFalseTypeOf, false, 'error in typeof object key')
            assert.typeOf(pizzas,'object', 'must be an object')
            
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })
})