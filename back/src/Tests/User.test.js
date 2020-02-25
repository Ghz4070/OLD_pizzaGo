import { assert } from 'chai';
import User from '../Controllers/UserController';

suite('Test controller User', async () => {
    test('should get all Users', (done) => {      
        let boolFalseStructure = false;
        let boolFalseTypeOf = false

        const structureOjectUser = {
            tel: 'string',
            zip: 'number',
            email: 'string',
            role: 'object',
            firstname: 'string',
            country: 'string',
            lastname: 'string',
            id: 'string',
            tokenActivate: 'string',
            address: 'string',
            password: 'string' 
        }
        
        User.getAllUser()
        .then((result) => {
            const keyStructure = Object.keys(structureOjectUser);
            for(const i in result.result[0]){
                if(keyStructure.indexOf(i) === -1){
                    boolFalseStructure = true;
                }
                if(typeof(result.result[0][i]) !== structureOjectUser[i]){
                    boolFalseTypeOf = true;   
                    console.log(structureOjectUser[i])
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