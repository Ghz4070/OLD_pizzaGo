import bcrypt from 'bcryptjs';
import validator from 'validator';

import { prisma } from '../Providers/generated/prisma-client';
import { success, error } from '../returnFunc';
import { getOnlyMailUser } from '../Queries/GraphQLQueries';

class UserController {
    getAllUser() {
        return new Promise(async (next) => {
            const Users = await prisma.users()
            if(Users.length > 0) {
                next(success(Users));
            }else {
                next(success('no user'));
            }
        })
    }

    addUser(user) {
        return new Promise (async (next) => {
            if(await this.checkEmail(user.data.email)){
                const crypt = await this.encryptorData(user.data.password);
                await prisma.createUser({
                    firstname : user.data.firstname,
                    lastname: user.data.lastname,
                    address: user.data.address,
                    zip: user.data.zip,
                    country: user.data.country,
                    tel: user.data.tel,
                    email: user.data.email,
                    password: crypt,
                    role : {set: ['ROLE_USER']},
                    tokenActivate: crypt,
                    tokenResetPassword: null
                });
                next(success('user has been added'));
            } else {
                next(error("this email has been used"));
            }
        })
    }

    checkEmail(email) {
        return new Promise (async (next) => {
            let check = true;
            const getUser = await prisma.$graphql(getOnlyMailUser(email));

            if(getUser.users.length > 0){
                check = false;
            }

            await validator.isEmail(email) ? check = true : check = false;
            next(check);
        })
    }

    encryptorData(toEncrypt) {
        return new Promise (async (next) => {
           if(typeof(toEncrypt) === "string"){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(toEncrypt, salt);
                next(hash);
           }  
        })
    }

}

export default new UserController();