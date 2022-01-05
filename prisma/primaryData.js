import pkg from '@prisma/client'
const {PrismaClient} = pkg
const prisma = new PrismaClient()

const primaryDishes = [
    {
        naming: "Roastbeef",
        ingredients: ["Beef", "Salt", "Pepper"],
        timeInMinutes: 20,
        priceInDollars: 10,
        hit:true,
        saleInPercents: 5
    },
    {
        naming: "Caesar salad",
        ingredients: ["Cheese", "Olivas", "Crackers", "Sause"],
        timeInMinutes: 20,
        priceInDollars: 7
    },
]

const primaryDrinks = [
    {
        naming: "Coca-cola",
        priceInDollars: 2,
        volumeInMl: 500,
        saleInPercents: 15
    },
    {
        naming: "Tea",
        priceInDollars: 1,
        volumeInMl: 250,
        hit: true
    }
]

async function dbFiller(){
    console.group('Filling database')
    for(const element of primaryDishes){
        const dish = await prisma.dishes.create({
            data: element
        })
        console.log(`dish "${dish.naming}" was created`)
    }
    for(const element of primaryDrinks){
        const drink = await prisma.drinks.create({
            data: element
        })
        console.log(`drink "${drink.naming}" was created`)
    }
    console.groupEnd()
}


dbFiller()
  .catch(e => {
    console.log(e)
    process.exit(1)
  }).finally(() => {await prisma.$disconnect()})
 



