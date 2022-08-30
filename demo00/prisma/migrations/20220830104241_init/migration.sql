-- CreateTable
CREATE TABLE "tehtava" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nimi" TEXT NOT NULL,
    "suoritettu" BOOLEAN NOT NULL DEFAULT false
);
