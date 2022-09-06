import express from "express";

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3001;

app.set("view engine", "ejs");

app.get("/", (req : express.Request, res : express.Response) => {

    res.render("index");

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`)

});