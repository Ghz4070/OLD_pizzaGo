import mongoose from 'mongoose';
import { username, password, portDB, bdd, host } from './../config';

//Méthode qui retourne une promesse. Elle se connecte puis retourne la connection.
export function connectBDD() {
    return new Promise((resolve, reject)=> {
        mongoose.connect(`mongodb://${username}:${password}@${host}:${portDB}/${bdd}?authSource=admin`, {useNewUrlParser: true})
        const db = mongoose.connection;
        db.on('error', () => {
            reject(db);
        })
        db.once('open', () => {
            resolve(db);
        });
    })
}