import express from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";

const app : express.Application = express();
const portti : number = Number(process.env.PORT) || 3002;
const prisma : PrismaClient = new PrismaClient();

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", async (req : express.Request, res : express.Response) => {
  
    res.render("index", { kuvat : await prisma.kuva.findMany() });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen: http://localhost:${portti}`);

});
