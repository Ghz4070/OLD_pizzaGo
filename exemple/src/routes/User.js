import express from 'express';

import User from './../controller/User';

export const anonymeUserRoute = express.Router();

anonymeUserRoute.route('/')
    .get((req, res) => {
        User.getAllUsers()
        .then((result) => {
            res.json(result)
        })
    })
anonymeUserRoute.route('/:id')
    .get((req, res) => {
        User.getUserById(req.params.id)
        .then((result) => {
            res.json(result)
        })
    })