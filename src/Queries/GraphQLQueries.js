export const getPizzaCatIng = `
    fragment getPizzaCatIng on Pizza {
        id
        price
        size
        composition
        ingredient {
            id 
            price
            quantity
            name
        }
        category {
            id
            name
        }
    }
`

export const getPizzaByCat = (name) => {
    return `
        query {
            pizzas(where: {category_every : {name : "${name}"}}) {
                id
                price
                size
                composition
                ingredient {
                    id
                    price
                    name
                    quantity
                }
                category{ 
                    id
                    name
                }
            }
        }
    `
} 

export const getOnlyMailUser = (email) => {
    return `
        query {
            users(where : {email : "${email}"}){
                email
            }
        }
    `
}

export const getUser = (email) => {
    return `
        query {
            users(where : {email : "${email}"}){
                email
                password
                role
                tokenActivate
            }
        }
    `
}