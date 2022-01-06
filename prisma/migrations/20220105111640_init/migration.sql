-- CreateTable
CREATE TABLE "Dishes" (
    "id" SERIAL NOT NULL,
    "naming" TEXT NOT NULL,
    "ingredients" TEXT[],
    "timeInMinutes" INTEGER NOT NULL,
    "priceInDollars" INTEGER NOT NULL,
    "hit" BOOLEAN,
    "saleInPercents" INTEGER,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drinks" (
    "id" SERIAL NOT NULL,
    "naming" TEXT NOT NULL,
    "volumeInMl" INTEGER NOT NULL,
    "priceInDollars" INTEGER NOT NULL,
    "hit" BOOLEAN,
    "saleInPercents" INTEGER,

    CONSTRAINT "Drinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dishes_naming_key" ON "Dishes"("naming");

-- CreateIndex
CREATE UNIQUE INDEX "Drinks_naming_key" ON "Drinks"("naming");
