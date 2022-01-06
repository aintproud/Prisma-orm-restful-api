import pkg from '@prisma/client'
const {PrismaClient} = pkg
import express from 'express';
const app = express();
const prisma = new PrismaClient()
const port = process.env.PORT || 8080;
import bodyparser from 'body-parser'

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/drinks', async(req, res)=>{
    const {
        naming, 
        volumeInMl, 
        priceInDollars, 
        hit, 
        saleInPercents
    } = req.body

    const create = await prisma.drinks.create({
        data: {
            naming,
            volumeInMl,
            priceInDollars,
            hit,
            saleInPercents
        }
    })
    res.json(create)
})
app.post('/dishes', async(req, res)=>{
    const {
        naming, 
        ingredients, 
        timeInMinutes, 
        priceInDollars, 
        hit, 
        saleInPercents
    } = req.body

    const create = await prisma.dishes.create({
        data:{
            naming: String(naming),
            ingredients: Array<string>(ingredients),
            timeInMinutes: Number(timeInMinutes),
            priceInDollars: Number(priceInDollars),
            hit: Boolean(hit),
            saleInPercents: Number(saleInPercents)
        }
    })
    res.json(create)
})

app.delete('/drinks/:naming', async (req, res) => {
    const drinkNaming = req.params.naming;
    const destruction = prisma.drinks.delete({
        where:{naming:drinkNaming}
    })
    res.json(destruction);
})
app.delete('/dishes/:naming', async (req, res) => {
    const drinkNaming = req.params.naming;
    const destruction = prisma.dishes.delete({
        where:{naming:drinkNaming}
    })
    res.json(destruction);
})

app.put('/drinks/:naming', async (req, res) => {
    const naming = req.params.naming;
    const {
        newNaming,
        newVolume, 
        newPriceInDollars, 
        newHit, 
        newSaleInPercents
    } = req.body
    const put = await prisma.drinks.update({
        where: {naming: String(naming)},
        data: {
            naming: String(newNaming),
            volumeInMl: Number(newVolume),
            priceInDollars: Number(newPriceInDollars),
            hit: Boolean(newHit),
            saleInPercents: Number(newSaleInPercents)
        }
    })
    res.json(put); 
})
app.put('/drinks/:naming', async (req, res) => {
    const {naming} = req.params;
    const {
        newNaming,
        newIngredients, 
        newTimeInMinutes,
        newPriceInDollars, 
        newHit, 
        newSaleInPercents
    } = req.body
    const put = await prisma.dishes.update({
        where: {naming: String(naming)},
        data: {
            naming: String(newNaming),
            ingredients: Array<string>(newIngredients),
            priceInDollars: Number(newPriceInDollars),
            timeInMinutes: Number(newTimeInMinutes),
            hit: Boolean(newHit),
            saleInPercents: Number(newSaleInPercents)
        }
    })
    res.json(put); 
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