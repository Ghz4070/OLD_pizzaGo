import express from 'express';
import User from '../Controllers/UserController';

export const anonymeRouteUser = express.Router();

anonymeRouteUser.route('/')
    .get(async (req, res) => {
        const Users = await User.getAllUser();
        res.json(Users);
    })
