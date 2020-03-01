import { assert } from 'chai';
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

        Pizza.getPizzaById('ck768esii00hz0764ufbh3zdu')
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

        Pizza.getPizzaByCat('Première classe')
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

    test(('should to create a pizza'), (done) => {
       console.log('ok');
       done();
        /*Pizza.createPizza()
        .then((pizza) => {

        })
        .catch((err) => {
            
        })*/
    })


})