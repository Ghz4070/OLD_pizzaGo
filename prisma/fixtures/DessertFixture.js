const { prisma } = require('../../src/generated/prisma-client');

async function dessertFixture() {
    await prisma.createDessert({
        price: 3.50,
        name: 'Tiramisu nutella',
    })

    await prisma.createDessert({
        price: 3.50,
        name: 'Tiramisu oreo',
    })

    await prisma.createDessert({
        price: 2.50,
        name: 'Tiramisu',
    })
}
dessertFixture().catch(e => console.error(e));
