import express from 'express';
import User from '../Controllers/UserController';

import { error } from '../returnFunc';

export const anonymeRouteUser = express.Router();

anonymeRouteUser.route('/')
    .get(async (req, res) => {
        const Users = await User.getAllUser();
        res.json(Users);
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