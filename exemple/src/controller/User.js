import { allUsers, userById } from './../providers/UserInterface';
import { success, error } from '../returnFunc';

class User {

    getAllUsers() {
        return new Promise((next) => {
            allUsers()
                .then((users) => {
                    if (users.length >= 1) {
                        next(success(users))
                    } else {
                        next('No users found');
                    }
                })
        })
    }

    getUserById(id) {
        return new Promise((next) => {
            userById(id)
                .then((user) => {
                    if (user.length >= 1) {
                        next(success(user))
                    } else {
                        next('Unknown ID or user')
                    }
                })
        })
    }
}

module.exports = new User();