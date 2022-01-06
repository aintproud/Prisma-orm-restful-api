var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import express from 'express';
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;
import bodyparser from 'body-parser';
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post('/drinks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { naming, volumeInMl, priceInDollars, hit, saleInPercents } = req.body;
    const create = yield prisma.drinks.create({
        data: {
            naming,
            volumeInMl,
            priceInDollars,
            hit,
            saleInPercents
        }
    });
    res.json(create);
}));
app.post('/dishes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { naming, ingredients, timeInMinutes, priceInDollars, hit, saleInPercents } = req.body;
    const create = yield prisma.dishes.create({
        data: {
            naming: String(naming),
            ingredients: Array(ingredients),
            timeInMinutes: Number(timeInMinutes),
            priceInDollars: Number(priceInDollars),
            hit: Boolean(hit),
            saleInPercents: Number(saleInPercents)
        }
    });
    res.json(create);
}));
app.delete('/drinks/:naming', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drinkNaming = req.params.naming;
    const destruction = prisma.drinks.delete({
        where: { naming: drinkNaming }
    });
    res.json(destruction);
}));
app.delete('/dishes/:naming', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drinkNaming = req.params.naming;
    const destruction = prisma.dishes.delete({
        where: { naming: drinkNaming }
    });
    res.json(destruction);
}));
app.put('/drinks/:naming', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const naming = req.params.naming;
    const { newNaming, newVolume, newPriceInDollars, newHit, newSaleInPercents } = req.body;
    const put = yield prisma.drinks.update({
        where: { naming: String(naming) },
        data: {
            naming: String(newNaming),
            volumeInMl: Number(newVolume),
            priceInDollars: Number(newPriceInDollars),
            hit: Boolean(newHit),
            saleInPercents: Number(newSaleInPercents)
        }
    });
    res.json(put);
}));
app.put('/drinks/:naming', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { naming } = req.params;
    const { newNaming, newIngredients, newTimeInMinutes, newPriceInDollars, newHit, newSaleInPercents } = req.body;
    const put = yield prisma.dishes.update({
        where: { naming: String(naming) },
        data: {
            naming: String(newNaming),
            ingredients: Array(newIngredients),
            priceInDollars: Number(newPriceInDollars),
            timeInMinutes: Number(newTimeInMinutes),
            hit: Boolean(newHit),
            saleInPercents: Number(newSaleInPercents)
        }
    });
    res.json(put);
}));
app.get('/drinks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drinks = yield prisma.dishes.findMany({});
    res.json(drinks);
}));
app.get('/dishes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dishes = yield prisma.dishes.findMany({});
    res.json(dishes);
}));
app.listen(port, () => console.log(`server is up on ${port}`));