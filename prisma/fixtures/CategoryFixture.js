const { prisma } = require('../../src/generated/prisma-client');

async function categoryFixture() {
    await prisma.createCategory({
        name: 'Première classe'
    })

    await prisma.createCategory({
        name: 'Deuxième classe'
    })
}
categoryFixture().catch(e => console.error(e));