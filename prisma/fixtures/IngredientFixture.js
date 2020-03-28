const { prisma } = require('../../src/generated/prisma-client');

async function ingredientFixture() {
    await prisma.createIngredient({
        price: 3,
        quantity: 300,
        name: 'viande haché'
    })

    await prisma.createIngredient({
        price: 2,
        quantity: 100,
        name: 'thon'
    })
}
ingredientFixture().catch(e => console.error(e));