const { prisma } = require('../providers/generated/prisma-client');

function categoryFixture() {
    prisma.createCategory({
        name: 'Première classe'
    })
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))
    
    prisma.createCategory({
        name: 'Deuxième classe'
    })
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))
}

categoryFixture();