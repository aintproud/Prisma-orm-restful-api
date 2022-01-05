import pkg from '@prisma/client'
const {PrismaClient} = pkg
import express from 'express';
const app = express();
const prisma = new PrismaClient()
const port = process.env.PORT || 8080;

app.post('/drinks', async(req, res)=>{
    const {
        naming, 
        ingredients, 
        timeInMinutes, 
        priceInDollars, 
        hit, 
        saleInPercents
    } = req.body||undefined

    const result = await prisma.dishes.create({
        data:{
            naming: naming,
            ingredients: ingredients,
            timeInMinutes: timeInMinutes,
            priceInDollars: priceInDollars,
            hit: hit,
            saleInPercents: saleInPercents
        }
    })
    req.json(result)
})
app.post('/dishes', async(req, res)=>{
    const {
        naming, 
        ingredients, 
        timeInMinutes, 
        priceInDollars, 
        hit, 
        saleInPercents
    } = req.body||undefined

    const result = await prisma.dishes.create({
        data:{
            naming: naming,
            ingredients: ingredients,
            timeInMinutes: timeInMinutes,
            priceInDollars: priceInDollars,
            hit: hit,
            saleInPercents: saleInPercents
        }
    })
    req.json(result)
})

app.delete('/drinks/:naming', async (req, res) => {
    const drinkNaming = req.params.name;
    const destruction = prisma.drinks.delete({
        where:{naming:drinkNaming}
    })
    res.json(destruction);
})
app.delete('/dishes/:naming', async (req, res) => {
    const drinkNaming = req.params.name;
    const destruction = prisma.dishes.delete({
        where:{naming:drinkNaming}
    })
    res.json(destruction);
})

app.put('/drinks/:naming', async (req, res) => {
    const naming = req.params.naming;
    const {
        ingredients, 
        timeInMinutes, 
        priceInDollars, 
        hit, 
        saleInPercents
    } = req.body||undefined
    const put = await prisma.drinks.update({
        where: {naming: naming},
        data: {
            
        }

    })
    res.json(put); 
})
app.put('/dishes/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const postData = await prisma.dishes.findUnique({
        where: { id: Number(id) },
        select: {
          published: true,
        },
      })
  
      const updatedPost = await prisma.dishes.update({
        where: { id: Number(id) || undefined },
        data: { published: !postData?.published },
      })
      res.json(updatedPost)
    } catch (error) {
      res.json({ error: `Post with ID ${id} does not exist in the database` })
    }
  })

app.get('/drinks', async (req, res) => {
    const drinks = await prisma.dishes.findMany()
    res.json(drinks)
})
app.get('/dishes', async (req, res) => {
    const dishes = await prisma.dishes.findMany()  
    res.json(dishes)
})


app.listen(port, ()=> console.log(`server is up on ${port}`))