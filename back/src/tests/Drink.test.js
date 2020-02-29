import { assert } from 'chai';
import Drink from '../Controllers/DrinkController';

suite('Test controller Drink', async () => {

    test('should delete a Drink', (done) => {
        let param = {
            id:""
        };
        let lengthArray = "";
        
        /* Drink.getAllDrink()
        .then((result) => {
            lengthArray = result.result.length;
            console.log("lengthArray");
            console.log(lengthArray);
            param.id = result.result[0].id;
            Drink.deleteDrink(param).then(resp => {
                console.log(result.result.length)
                done();
            })
        }) */


        Drink.getAllDrink().then((resp1) => {
            lengthArray = resp1.result.length;
            console.log(lengthArray);
            param.id = resp1.result[0].id;
        }).then((resp1) => {
            Drink.deleteDrink(param)
            
        }).then((resp1) => {
            Drink.getAllDrink();
            console.log(resp1);
        });

        Drink.getAllDrink()
        .then((result) => {
            console.log("second");
            console.log(result.result.length);
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })


    test('should get all Drinks', (done) => {      
        let boolFalseStructure = false;
        let boolFalseTypeOf = false

        const structureOjectDrink = {
            id: 'string',
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

    test('should post a Drink', (done) => {      
        let boolFalseStructure = false;
        let boolFalseTypeOf = false

        const valueStructureOjectDrink = {
            price:10,
            name:"Test",
            oz:10
        }
        
        Drink.addDrink(valueStructureOjectDrink)
        .then((result) => {
            const keyStructure = Object.keys(valueStructureOjectDrink);
            for(const i in result.result[0]){
                if(keyStructure.indexOf(i) === -1){
                    boolFalseStructure = true;
                }
                if(typeof(result.result[0][i]) !== valueStructureOjectDrink[i]){
                    boolFalseTypeOf = true;   
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