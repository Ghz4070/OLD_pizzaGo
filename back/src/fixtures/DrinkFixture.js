const { prisma } = require('../providers/generated/prisma-client');

function categoryFixture() {
    prisma.createDrink({
        price: 2.50,
        name: 'RedBull',
        oz: 2.5,
    })
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))

    prisma.createDrink({
        price: 1.50,
        name: 'Coca-Cola',
        oz: 2.5,
    })
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))
}

categoryFixture();