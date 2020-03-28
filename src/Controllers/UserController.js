import bcrypt from 'bcryptjs';
import validator from 'validator';
import JWT from 'jsonwebtoken';

import { prisma } from '../generated/prisma-client';
import { success, error } from '../returnFunc';
import { getOnlyMailUser, getUser } from '../Queries/GraphQLQueries';
import { secret } from '../config.json';

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

    getUserById(id) {
        return new Promise(async (next) => {
            const User = await prisma.user({id: id});
            if(User) {
                next(success(User));
            }else {
                next(error('user doesnt exist'));
            }
        })
    }

    addUser(user) {
        return new Promise (async (next) => {
            if(await this.existEmail(user.data.email)){
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

    deleteUser(id) {
        return new Promise(async (next) => {
            if(await this.checkUserExistByID(id)){
                next(success('User has been deleted'));
            }else{
                next(error("Doesn't exist"));
            }
        })
    }

    connection(user) {
        return new Promise(async (next) => {
            const checkMail = await this.existAccount(user.data.email);

            if(checkMail.result !== "not found"){
                const { password, tokenActivate } = checkMail.result.users[0];
                if(await this.checkAccountActivate(tokenActivate)){
                    const decrypt = await this.decryptorData(user.data.password, password);
                    if(decrypt){
                        const token = await this.createTokenJWT(checkMail.result.users[0]);
                        next(success(token));
                    }else {
                        next(error('Error password'));
                    }
                }else{
                    next(error('Activate your account'));
                }
            }else {
                next(error('Account not exist'));
            }
        })
    }

    checkUserExistByID(userId){
        return new Promise(async (next) => {
            const checkuser = await prisma.user({id: userId});
            if(checkuser){
                next(true);
            }else{
                next(false);
            }
        })
    }

    existAccount(email) {
        return new Promise(async (next) => {
           const user = await prisma.$graphql(getUser(email));
           if(user){
               next(success(user));
           }else {
               next(error('not found'));
           }
        })
    }

    existEmail(email) {
        return new Promise (async (next) => {
            let check = true;
            const getUser = await prisma.$graphql(getOnlyMailUser(email));

            if(getUser.users.length > 0){
                check = false;
                next(check);
            }else {
                await validator.isEmail(email) ? check = true : check = false;
                next(check);
            }

            
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

    decryptorData(compare,crypted) {
        return new Promise (async (next) => {
            if(compare.trim() !== null || compare.trim() !== "" && crypted.trim() !== null || crypted.trim() !== "" ){
                const decrypt = await bcrypt.compare(compare, crypted);
                next(decrypt);
            }
        })
    }

    createTokenJWT(user) {
        return new Promise(async (next) => {
            const token = await JWT.sign({role: user.role, email: user.email},secret,{algorithm: 'HS256',expiresIn: '24h'});
            next(token);
        })
    }

    checkAccountActivate(tokenActivate) {
        return new Promise(async (next) => {
            if(tokenActivate.trim() == "" || tokenActivate == null){
                next(true);
            }else {
                next(false);
            }
        })
    }
}

export default new UserController();