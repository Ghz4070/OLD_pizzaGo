const {prisma} = require('../providers/generated/prisma-client');

async function pizzaFixture() {

    await prisma.createPizza({
        price: 20.09,
        size: 'L',
        composition: {
            sauce : 'tomato',
            cheese: true 
        },
        ingredient: {
            connect: {
                id: 'ck760vm5l00360764os4zuj1t'
            }
        },
        category: {
            connect: {
                id: 'ck760vp5u003g0764x772znhz'
            }
        }
    })


    await prisma.createPizza({
        price: 40.39,
        size: 'XL',
        composition: {
            sauce : 'tomato',
            cheese: false 
        },
        ingredient: {
            connect: {
                id: 'ck760vm6c003b07643cu47g29'
            }
        },
        category: {
            connect: {
                id: 'ck760vp6l003l0764tg2hrlu6'
            }
        }
    })
}
pizzaFixture().catch(e => console.error(e));