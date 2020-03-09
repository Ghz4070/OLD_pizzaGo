import express from 'express';
import JWT from 'jsonwebtoken';

import User from '../Controllers/UserController';

import { error } from '../returnFunc';

export const anonymeRouteUser = express.Router();
export const adminRouteUser = express.Router();

adminRouteUser.route('/')
    .get(async (req, res) => {
        const decode = await JWT.decode(req.headers['x-access-token'], {complete: true});
        const { role } = decode.payload;
        
        if(role.indexOf('ROLE_ADMIN') !== -1){
            const Users = await User.getAllUser();
            res.json(Users);
        }else{
            res.json(error("You are not an admin"));
        }
    })
adminRouteUser.route('/:id')
    .get(async (req, res) => {
        const decode = await JWT.decode(req.headers['x-access-token'], {complete: true});
        const { role } = decode.payload;
        
        if(role.indexOf('ROLE_ADMIN') !== -1){
            const user = await User.getUserById(req.params.id);
            res.json(user);
        }else{
            res.json(error("You are not an admin"));
        }
    })
    
adminRouteUser.route('/delete/:id')
    .delete(async (req, res) => {
        const decode = await JWT.decode(req.headers['x-access-token'], {complete: true});
        const { role } = decode.payload;
        
        if(role.indexOf('ROLE_ADMIN') !== -1){
            const user = await User.deleteUser(req.params.id);
            res.json(user);
        }else{
            res.json(error("You are not an admin"));
        }
    })
    
anonymeRouteUser.route('/add')
    .post(async (req, res) => {
        const checkPass = req.body.firstPassword === req.body.secondPassword ? req.body.firstPassword : false;
        
        if(checkPass !== false){
            const param = {
                data : {
                    tel: req.body.tel,
                    zip: req.body.zip,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    country: req.body.country,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    password: checkPass
                }
            };

            const addNewUser = await User.addUser(param);
            res.json(addNewUser);
        } else {
            res.json(error('not same password'));
        }
    })

anonymeRouteUser.route('/connection')
    .get(async (req, res) => {
        const param = {
            data: {
                email : req.body.email,
                password: req.body.password,
            }
        }
        const connectionUser = await User.connection(param);
        res.json(connectionUser);
    })