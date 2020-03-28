const { prisma } = require('../../src/generated/prisma-client');

async function userFixture() {
    await prisma.createUser({
        firstname: 'Raphael',
        lastname: 'Torres Paiva',
        address: '9 rue vincent palaric',
        zip: 93400,
        country: 'Saint-Ouen',
        tel: '0622411970',
        email: 'paiva.raphaelt@gmail.com',
        password: 'Azerty99-',
        tokenActivate: 'a',
        role: { set: ["USER", "ADMIN"] }
    })
}

userFixture().catch(e => console.error(e));

// const userFixture = require('./UserFixture');
// const ingredientFixture = require('./IngredientFixture');
// const drinkFixture = require('./DrinkFixture');
// const categoryFixture = require('./CategoryFixture');
// const pizzaFixture = require('./PizzaFixture');

// userFixture.userFixture;
// ingredientFixture.ingredientFixture;
// drinkFixture.drinkFixture;
// categoryFixture.categoryFixture;
// pizzaFixture.pizzaFixture;