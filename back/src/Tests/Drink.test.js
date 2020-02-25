import { assert } from 'chai';
import Drink from '../Controllers/DrinkController';

suite('Test controller Drink', async () => {
    test('should get all Drinks', (done) => {      
        let boolFalseStructure = false;
        let boolFalseTypeOf = false

        const structureOjectDrink = {
            price: 'number',
            name: 'string',
            oz: 'number',
        }
        
        Drink.getAllDrink()
        .then((result) => {
            const keyStructure = Object.keys(structureOjectDrink);
            for(const i in result.result[0]){
                if(keyStructure.indexOf(i) === -1){
                    boolFalseStructure = true;
                }
                if(typeof(result.result[0][i]) !== structureOjectDrink[i]){
                    boolFalseTypeOf = true;   
                    console.log(structureOjectDrink[i])
                }
            }

            assert.equal(boolFalseStructure, false, 'error in structure object')
            assert.equal(boolFalseTypeOf, false, 'error in typeof object key')
            assert.typeOf(result,'object', 'must be an object')
            
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })
})