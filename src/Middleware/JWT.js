import JWT from 'jsonwebtoken';
import { error } from '../returnFunc';
import { secret } from '../config.json';

export let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(token){
        JWT.verify(token, secret, (err, decoded) => {
            if(err){
                return res.json(error('Token is not valid'));
            }else{ 
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.json(error('Auth token is not supplied'));
    }
}