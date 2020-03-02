const { prisma } = require('../providers/generated/prisma-client');

function userFixture() {
    prisma.createUser({
        firstname: 'Raphael',
        lastname: 'Torres Paiva',
        address: '9 rue vincent palaric',
        zip: 93400,
        country: 'Saint-Ouen',
        tel: '0622411970',
        email: 'paiva.raphaelt@gmail.com',
        password: 'Azerty99-',
        role: {
            role: 'user'
        },
        tokenActivate: 'a'
    })
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))

}

userFixture();

