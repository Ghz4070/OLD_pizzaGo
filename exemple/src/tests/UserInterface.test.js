import { assert }from 'chai';
import { allUsers, userById, addUser } from './../providers/UserInterface';


suite('Method for user', () => {
    test('should to get an object', (done) => {
        allUsers()
        .then((result) => {
            const compareObjectOne = [];
            const compareObjectTwo = [];
            
            const structureObject = {
                "role": [
                    "ROLE_USER",
                    "ROLE_ADMIN",
                    ""
                ],
                "_id": "5d77de499eba70054729851c",
                "firstname": "Raphael",
                "lastname": "Torres",
                "birthday": "2019-09-08T22:00:00.000Z",
                "username": "Raphael93400",
                "password": "a",
                "tokenPasswordReset": "a",
                "tokenActivateAccount": "a"
            };
            
            for(let i in structureObject){
                compareObjectOne.push(i);
            }
            
            for(let i in result[0]){
                for(let u in compareObjectOne){
                    if(compareObjectOne[u] == i){
                        compareObjectTwo.push(i);
                    }
                }
            }

            assert.equal(compareObjectOne.length, compareObjectTwo.length, 'Not the same length');
            assert.sameMembers(compareObjectOne, compareObjectTwo, 'Not the same keys');
            assert.typeOf(result, "array", 'Not the type');
            done();
        })
    })
    test('should to get only one user', (done) => {
        userById('5d77de499eba70054729851c')
        .then((result) => {
            const compareObjectOne = [];
            const compareObjectTwo = [];
            
            const structureObject = {
                "role": [
                    "ROLE_USER",
                    "ROLE_ADMIN",
                    ""
                ],
                "_id": "5d77de499eba70054729851c",
                "firstname": "Raphael",
                "lastname": "Torres",
                "birthday": "2019-09-08T22:00:00.000Z",
                "username": "Raphael93400",
                "password": "a",
                "tokenPasswordReset": "a",
                "tokenActivateAccount": "a"
            };
            
            for(let i in structureObject){
                compareObjectOne.push(i);
            }
            
            for(let i in result[0]){
                for(let u in compareObjectOne){
                    if(compareObjectOne[u] == i){
                        compareObjectTwo.push(i);
                    }
                }
            }
            assert.equal(result.length, 1, 'Isnt only 1 array');
            assert.equal(compareObjectOne.length, compareObjectTwo.length, 'Not the same length');
            assert.sameMembers(compareObjectOne, compareObjectTwo, 'Not the same keys');
            assert.typeOf(result, "array", 'Not the type');
            done();
        })
    })

    test('should create a user', (done) => {
        const user = {
            firstname: 'Cathareeya',
            lastname: 'AOC',
            birthday: '2019-09-20',
            username: 'Raph9434',
            password: 'a',
            role: ['ROLE_ADMIN','ROLE_USER'],
            tokenActivateAccount: 'dnfzezhjkzfbauie'
        };
        
        assert.typeOf(user, 'object', 'not the type');
        addUser(user)
        .then((result) => {
            assert.typeOf(result, "object", 'Not the type');
            done();
        })
    })
})