const { prisma } = require('../../src/generated/prisma-client');

async function pizzaFixture() {

    await prisma.createPizza({
        price: 20.09,
        size: 'L',
        composition: {
            sauce: 'tomato',
            cheese: true
        },
        ingredient: {
            connect: {
                id: 'ck8bzequz001p0762sfftzb10'
            }
        },
        category: {
            connect: {
                id: 'ck8bzcyzg00100762rvgzdujb'
            }
        }
    })

    await prisma.createPizza({
        price: 40.39,
        size: 'XL',
        composition: {
            sauce: 'tomato',
            cheese: false
        },
        ingredient: {
            connect: {
                id: 'ck8bzeqwe001u0762vzvwukpa'
            }
        },
        category: {
            connect: {
                id: 'ck8bzcyxr000v0762ws3bzhjg'
            }
        }
    })
}
pizzaFixture().catch(e => console.error(e));