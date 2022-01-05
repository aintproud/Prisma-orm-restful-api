import pkg from '@prisma/client'
const {PrismaClient} = pkg
const prisma = new PrismaClient();

async function main() {
  const allDishes = await prisma.dishes.findMany();
  const allDrinks = await prisma.drinks.findMany();

  const postDish = await prisma.dishes.create({
    //
  });
  const postDrink = await prisma.drinks.create({
    //
  });
}

main()
  .catch(e => {
    throw e;
  })
  // .finnaly(() => await prisma.$disconnect());
