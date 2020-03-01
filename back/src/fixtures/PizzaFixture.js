const {prisma} = require('../Providers/generated/prisma-client');

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
                id: 'ck79bqj4j001e0739t1cc1uwj'
            }
        },
        category: {
            connect: {
                id: 'ck79bqmim001o0739bbrrltba'
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
                id: 'ck79bqj5g001j0739verzunk9'
            }
        },
        category: {
            connect: {
                id: 'ck79bqmjd001t07396lyh6cj0'
            }
        }
    })
}
pizzaFixture().catch(e => console.error(e));