import { connectBDD } from './ConnectionBDD';
import { userSchema } from './../model/User';

// Une function qui contient une promesse, qui retourne tous les utilisateurs. 
export function allUsers(){
    return new Promise ((resolve, reject) => {
        connectBDD()
        .then((db) => {
            const User = db.model('User', userSchema);
            User.find({})
            .then((user) => {
                resolve(user);
            })    
        })
        .catch((err) => reject(err))
    })
}
// Une function qui contient une promesse, qui retourne un utilisateur en fonction de l'id 
export function userById(id){
    return new Promise ((resolve, reject) => {
        connectBDD()
        .then((db) => {
            const User = db.model('User', userSchema);
            User.find({_id: id})
            .then((user) => {
                resolve(user);
            })  
        })
    })
    .catch((err) => reject(err))
}

export function addUser(user){
    return new Promise((resolve, reject) => {
        connectBDD()
        .then((db) => {
            const User = db.model('User', userSchema);
            User.create(user)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
}

export function checkPassword(pwdone, pwdtwo){
    const bool = false;
    if(pwdone === pwdtwo){
        bool = true;
    }
    return bool;
}

export function checkUsername(username){
    return new Promise((resolve, reject) => {
        connectBDD()
        .then((db) => {
            const User = db.model('User', userSchema);
            User.find({username: username})
            .then((result) =>{
                resolve(result);
            })
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
}
