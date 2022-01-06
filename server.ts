import {PrismaClient} from '@prisma/client'
// const {PrismaClient} = pkg
import express from 'express';
const app = express();
const prisma = new PrismaClient()
const port = process.env.PORT || 8080;
import bodyparser from 'body-parser'

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/drinks', async(req, res)=>{
    try {const {
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
    res.json(create)}
    catch(e){
        console.log(e)
        res.json({"error": e})
    }
})
app.post('/dishes', async(req, res)=>{
    try{const {
        naming, 
        ingredients, 
        timeInMinutes, 
        priceInDollars, 
        hit, 
        saleInPercents
    } = req.body

    const create = await prisma.dishes.create({
        data:{
            naming,
            ingredients,
            timeInMinutes,
            priceInDollars,
            hit,
            saleInPercents
        }
    })
    res.json(create)}
    catch(e){
        console.log(e)
        res.json({"error": e})
    }
})

app.delete('/drinks/:naming', async (req, res) => {
    try {const {naming} = req.params;
    const destruction = prisma.drinks.delete({
        where:{naming: naming}
    })
    res.json(destruction);}
    catch(e){
        res.json({"error": e})
    }
})
app.delete('/dishes/:naming', async (req, res) => {
    try{const {naming} = req.params;
    const destruction = prisma.dishes.delete({
        where:{naming: naming}
    })
    res.json(destruction);}
    catch(e){
        res.json({"error": e})
    }
})

app.put('/drinks/:naming', async (req, res) => {
    const {naming} = req.params;
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
            naming: newNaming,
            volumeInMl: newVolume,
            priceInDollars: newPriceInDollars,
            hit: newHit,
            saleInPercents: newSaleInPercents
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
            naming: newNaming,
            ingredients: newIngredients,
            priceInDollars:newPriceInDollars,
            timeInMinutes: newTimeInMinutes,
            hit: newHit,
            saleInPercents: newSaleInPercents
        }
    })
    res.json(put); 
})

app.get('/drinks', async (req, res) => {
    const drinks = await prisma.drinks.findMany()
    res.json(drinks)
})
app.get('/dishes', async (req, res) => {
    const dishes = await prisma.dishes.findMany()  
    res.json(dishes)
})


app.listen(port, ()=> console.log(`server is up on ${port}`))