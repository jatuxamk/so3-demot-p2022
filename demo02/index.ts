import express from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from "fs/promises"; 

const app : express.Application = express();
const portti : number = Number(process.env.PORT) || 3002;
const prisma : PrismaClient = new PrismaClient();
const uploadKasittelija = multer({ dest : path.resolve(__dirname, "tmp") });

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

app.post("/lisaa", uploadKasittelija.single("tiedosto"), async (req : express.Request, res : express.Response) => {
  
    let tiedostonimi : string = `${req.file?.filename}.jpg`;

    await fs.copyFile(path.resolve(__dirname, "tmp", String(req.file?.filename)), path.resolve(__dirname, "public", "img", tiedostonimi));

    await prisma.kuva.create({
        data : {
            teksti : req.body.teksti || "Nimetön kuva",
            tiedosto : tiedostonimi
        }
    });

    res.redirect("/");

});

app.get("/lisaa", async (req : express.Request, res : express.Response) => {
  
    res.render("lisaa");

});

app.get("/", async (req : express.Request, res : express.Response) => {
  
    res.render("index", { kuvat : await prisma.kuva.findMany() });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen: http://localhost:${portti}`);

});
