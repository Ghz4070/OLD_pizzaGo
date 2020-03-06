import { assert } from 'chai';
import bcrypt from 'bcryptjs';

import User from '../Controllers/UserController';
import { prisma } from '../Providers/generated/prisma-client';

suite('Test controller User', () => {
    test('should get all Users', (done) => {      
        let boolFalseStructure = false;
        let boolFalseTypeOf = false;

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
            password: 'string',
            tokenResetPassword : 'string'
        };
        
        User.getAllUser()
        .then((users) => {
            const keyStructure = Object.keys(structureOjectUser);
            for(const i in users.result[0]){
                if(keyStructure.indexOf(i) === -1){
                    console.log(keyStructure[i])
                    boolFalseStructure = true;
                }
                if(typeof(users.result[0][i]) !== structureOjectUser[i]){
                    boolFalseTypeOf = true;   
                }
            }

            assert.equal(boolFalseStructure, false, 'error in structure object');
            assert.equal(boolFalseTypeOf, false, 'error in typeof object key');
            assert.typeOf(users,'object', 'must be an object');
            
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    test('should post an user', (done) => {
        (async () => {

            let boolFalseStructure = false;
            let boolFalseTypeOf = false
            let boolAdd = false;
            let boolCrypted = false;
            let boolToken = false;

            const structureOjectUser = {
                tel: 'string',
                zip: 'number',
                email: 'string',
                role: 'array',
                firstname: 'string',
                country: 'string',
                lastname: 'string',
                address: 'string',
                password: 'string' 
            }
            const fixtureUser = {
                data : {
                    tel: '0622411970',
                    zip: 93400,
                    email: 'paiva.raphaelt@gmaaile.com',
                    firstname: 'Raphael',
                    country: 'France',
                    lastname: 'Torres Paiva',
                    address: '9 rue vincent palaric',
                    password: 'a' 
                }
            }

            // Verifier que le mot de passe soit crypter, verifier qu'il a bien un token d'activation

            const lengthUser = await User.getAllUser();
            await User.addUser(fixtureUser);
            const lengthUserAfterAdd = await User.getAllUser(); 

            if(lengthUser.result.length >= lengthUserAfterAdd.result.length) {
                boolAdd = true;
                assert.equal(boolAdd, true, "Error, user has been not added");
                const getLastUser = await prisma.users({last: 1});

                if(getLastUser[0].tokenActivate) {
                    const decryptToken = await bcrypt.compare('a',getLastUser[0].tokenActivate);
                    decryptToken ? boolToken = true : null ;
                }

                if(getLastUser[0].password) {
                    const decryptPassword = await bcrypt.compare('a',getLastUser[0].password);
                    decryptPassword ? boolCrypted = true : null;
                }

                assert.equal(boolCrypted, true , "isnt crypted");
                assert.equal(boolToken, true, 'not token');


                const keyStructure = Object.keys(structureOjectUser);
                
                for(const i in lengthUserAfterAdd){
                    if(keyStructure.indexOf(i) === -1){
                        boolFalseStructure = true;
                    }
                    if(typeof(lengthUserAfterAdd[0][i]) !== structureOjectUser[i]){
                        boolFalseTypeOf = true;   
                    }
                }

                assert.equal(boolFalseStructure, false, 'error in structure object');
                assert.equal(boolFalseTypeOf, false, 'error in typeof object key');
                assert.typeOf(lengthUserAfterAdd,'object', 'must be an object');
                /// getLastUser[0]
                
            } else {
                assert.equal(boolAdd, false, "Error, user has really added ?");
                
            }

        })();
        done();
    })

})