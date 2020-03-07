import { assert } from 'chai';
import Drink from '../Controllers/DrinkController';

suite('Test controller Drink', async () => {

    test('should get one Drink', (done) => {      
        let boolFalseStructure = false;
        let boolFalseTypeOf = false
        let param = {id : ""};

        const structureOjectDrink = {
            id: 'string',
            price: 'number',
            name: 'string',
            oz: 'number',
        }
        
        Drink.getAllDrink()
        .then((result) => {
            param.id = result.result[0].id 
        }).then(result2 => {
            Drink.getDrinkById(param).then(resp => {
                const keyStructure = Object.keys(structureOjectDrink);
                for(const i in resp.result[0]){
                    if(keyStructure.indexOf(i) === -1){
                        boolFalseStructure = true;
                    }
                    if(typeof(resp.result[0][i]) !== structureOjectDrink[i]){
                        boolFalseTypeOf = true;   
                    }
                }
                assert.equal(boolFalseStructure, false, 'error in structure object')
                assert.equal(boolFalseTypeOf, false, 'error in typeof object key')
                assert.typeOf(resp,'object', 'must be an object')
                done();
            });
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })
    

    test('should delete a Drink', (done) => {
        let param = {
            id: ""
        };
        let lengthBefore = "";
        let lengthAfter = "";
        let boolIsDeleted = false;

        Drink.getAllDrink()
            .then(result => {
                lengthBefore = result.result.length;
                param.id = result.result[0].id;
            })
            .then(newResult =>
                Drink.deleteDrink(param).then(resp => {
                })
            )
            .then(finalResult =>
                Drink.getAllDrink().then(result3 => { 
                    lengthAfter = result3.result.length;
                    if(lengthAfter < lengthBefore) {
                        boolIsDeleted = true;
                    };
                })   
            )
            assert.equal(boolIsDeleted, false, 'error file not deleted');
            done();
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