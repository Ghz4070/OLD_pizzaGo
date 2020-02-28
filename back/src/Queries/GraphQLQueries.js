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