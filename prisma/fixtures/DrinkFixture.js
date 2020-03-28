const { prisma } = require('../../src/generated/prisma-client');

async function ingredientFixture() {
    await prisma.createDrink({
        price: 1.50,
        name: 'Coca-Cola',
        oz: 2.5,
    })

    await prisma.createDrink({
        price: 2.50,
        name: 'Orangina',
        oz: 1.5,
    })

    await prisma.createDrink({
        price: 0.50,
        name: 'Evian',
        oz: 1.0,
    })

    await prisma.createDrink({
        price: 3.00,
        name: 'RedBull',
        oz: 1.25,
    })
}
ingredientFixture().catch(e => console.error(e));
