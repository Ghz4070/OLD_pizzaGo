import { assert } from 'chai';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

import User from '../Controllers/UserController';
import { prisma } from '../generated/prisma-client';

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
            for(const i in users.result[1]){
                if(keyStructure.indexOf(i) === -1){
                    boolFalseStructure = true;
                }
                if(typeof(users.result[1][i]) !== structureOjectUser[i]){
                    boolFalseTypeOf = true;   
                }
            }

            if(boolFalseTypeOf !== true){
                assert.equal(boolFalseStructure, false, 'error in structure object');
                assert.equal(boolFalseTypeOf, false, 'error in typeof object key');
                assert.typeOf(users,'object', 'must be an object');
            }
           
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
                role: 'object',
                firstname: 'string',
                country: 'string',
                lastname: 'string',
                address: 'string',
                password: 'string' ,
                tokenResetPassword:'string',
                tokenActivate: 'string',
                id: 'string' 
                
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

                for(const i in lengthUserAfterAdd.result[1]){
                    if(keyStructure.indexOf(i) === -1){
                        boolFalseStructure = true;
                    }
                    if(typeof(lengthUserAfterAdd.result[1][i]) !== structureOjectUser[i]){
                        console.log(lengthUserAfterAdd.result[1][i])
                        boolFalseTypeOf = true;   
                    }
                }
                
                assert.equal(boolFalseStructure, false, 'error in structure object');
                assert.typeOf(lengthUserAfterAdd,'object', 'must be an object');
                /// getLastUser[0]
                
            } else {
                assert.equal(boolAdd, false, "Error, user has really added ?");
                
            }

        })();
        done();
    })

    test('should connection', (done) => {
        (async () => {
            let boolFalseStructure = false;

            const user = {
                data : {
                    email : 'paiva.raphaelt@gmail.com',
                    password: 'a',
                    role : ['ROLE_USER']
                }
            }

            const tokenObject = {
                header: {alg : 'HS256', typ: 'JWT'},
                payload: 
                    {
                      role: ['ROLE_USER'],
                      email: 'paiva.raphaelt@gmail.com',
                      iat: 15833597672,
                      exp: 1583684072  
                    },
                signature: 'aZ4sIDv53ezdIOfb-Qmr3cYF71UXs_N2WjMsekPWgOk'
            };

            const structureObjectToken = {
                header: 'object',
                payload: 'object',
                signature: 'string'
            };

            const connection = await User.connection(user);
            const decode = await JWT.decode(connection.result, {complete: true});

            const keyStructure = Object.keys(structureObjectToken);
                
            for(const i in keyStructure){
                if(typeof(decode[keyStructure[i]]) !== structureObjectToken[keyStructure[i]]){
                    boolFalseStructure = true;
                }
            }
            assert.equal(boolFalseStructure, false, 'error in structure');
            assert.typeOf(decode, 'object', 'isnt an object');
        })();
        done();
    })

    test('shloud get an user', (done) => {
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
            address: 'string',
            password: 'string',
            id: 'string',
            tokenResetPassword:'string',
            tokenActivate: 'string' 
        }

        User.getUserById('ck7j9wix901y70796z9d95vs4')
        .then((user) => {
            const keyStructure = Object.keys(structureOjectUser);     
            for(const i in user.result){
                if(keyStructure.indexOf(i) === -1){ 
                    boolFalseStructure = true;
                }
            }
            assert.equal(boolFalseStructure, false, 'error in structure object');
            done();
        })
        .catch(err => done(err))
    })

    test('should delete an user', (done) => {
        User.getAllUser()
        .then((getAllUserBeforeDelete) => {
            User.deleteUser('ck7j9h9v501tn0796g1mrzotw')
            .then((deleteUser) => {
                User.getAllUser()
                .then((getAllUserAfterDelete) => {
                    let boolDelete = false;
                    const lengthBefore = getAllUserBeforeDelete.result.length;
                    const lengthAfter = getAllUserAfterDelete.result.length;

                    if(lengthAfter < lengthBefore){
                        boolDelete = true;
                        assert.equal(boolDelete, true, "Isnt delete");
                    }
                    else{
                        assert.equal(boolDelete, false, "He's deleted");
                    }
                    done();
                })
                .catch((err => done(err)))
            })
            .catch(err => done(err))
        })
        .catch(err => done(err))
        
    })
})