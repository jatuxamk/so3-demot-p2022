import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiTehtavatRouter : express.Router = express.Router();

apiTehtavatRouter.use(express.json());

apiTehtavatRouter.delete("/:id", async (req : express.Request, res : express.Response) => {

    await prisma.tehtava.delete({
        where : {
            id : Number(req.params.id)
        }
    })

    res.json(await prisma.tehtava.findMany());

});

apiTehtavatRouter.put("/:id", async (req : express.Request, res : express.Response) => {

    await prisma.tehtava.update({
        where : {
                id : Number(req.params.id)
            },
        data: {
            nimi : req.body.nimi,
            suoritettu : Boolean(req.body.suoritettu)
        }
    });

    res.json(await prisma.tehtava.findMany());

});

apiTehtavatRouter.post("/", async (req : express.Request, res : express.Response) => {

    await prisma.tehtava.create({
        data: req.body
    });

    res.json(await prisma.tehtava.findMany());

});

apiTehtavatRouter.get("/", async (req : express.Request, res : express.Response) => {

    res.json(await prisma.tehtava.findMany());

});

export default apiTehtavatRouter;