const { prisma } = require('../providers/generated/prisma-client');

function pizzaFixture() {

    prisma.createPizza({
        price: 20.99,
        size: 'L',
        composition: {
            sauce: 'tomato',
            cheese: true
        },
        ingredient: {
            connect: {
                id: prisma.ingredient({
                    
                })
            }
        },
        category: {
            connect: {
                id: 'ck760vp5u003g0764x772znhz'
            }
        }
    })
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))

    prisma.createPizza({
        price: 40.39,
        size: 'XL',
        composition: {
            sauce: 'tomato',
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
        .then(() => console.log('added'))
        .catch((err) => console.log(err.message))
}

pizzaFixture();