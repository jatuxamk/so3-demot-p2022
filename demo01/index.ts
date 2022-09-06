import express from "express";
import { PrismaClient } from "@prisma/client";
import { brotliDecompressSync } from "zlib";

const prisma : PrismaClient = new PrismaClient();

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3001;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.post("/poista", async (req : express.Request, res : express.Response) => {

    await prisma.tehtava.delete({
        where : {
            id : Number(req.body.id)
        }
    });

    res.redirect("/");

});

app.post("/", async (req : express.Request, res : express.Response) => {

    await prisma.tehtava.create({
        data : {
            nimi : req.body.nimi || "Nimetön tehtävä",
            suoritettu : false
        }
    });

    let tehtavat = await prisma.tehtava.findMany();

    res.render("index", { tehtavat : tehtavat });

});

app.get("/suoritettu", async (req : express.Request, res : express.Response) => {

    await prisma.tehtava.update({
        where : {
            id : Number(req.query.id)
        },
        data : {
            suoritettu : (req.query.suoritettu === "true") ? false : true
        }
    });

    res.redirect("/");

});

app.get("/", async (req : express.Request, res : express.Response) => {

    let tehtavat = await prisma.tehtava.findMany();

    res.render("index", { tehtavat : tehtavat });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`)

});