const {prisma} = require('../providers/generated/prisma-client');

async function main() {
    await prisma.createUser({
        firstname:'Raphael',
        lastname:'Torres Paiva',
        address:'9 rue vincent palaric',
        zip: 93400,
        country:'Saint-Ouen',
        tel: '0622411970',
        email: 'paiva.raphaelt@gmail.com',
        password:'Azerty99-',
        role:{
            role: 'user'
        },
        tokenActivate:'a'
    })

    await prisma.createOrder({
        price: 10.50,
        pizza: {
            pizza: ['premier pizza', 'deuxieme pizza']
        },
        drink: {
            drink: ['premiere boisson', 'deuxieme boisson']
        },
        ingredient: {
            ingredient: ['premier ingredient', 'deuxieme ingredient']
        },
        user: {

        }
    })
}

main().catch(e => console.error(e));
