import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiTehtavatRouter : express.Router = express.Router();

apiTehtavatRouter.use(express.json());

apiTehtavatRouter.delete("/:id", async (req : express.Request, res : express.Response) => {

    if (await prisma.tehtava.count({
            where : {
                id : Number(req.params.id)
            }
    })) {

        try {

            await prisma.tehtava.delete({
                where : {
                    id : Number(req.params.id)
                }
            })
        
            res.json(await prisma.tehtava.findMany());

        } catch (e : any) {

            res.status(500).json({"virhe" : "Palvelimella tapahtui odottamaton virhe."})

        }

    } else {

        res.status(400).json({ "virhe" : "Virheellinen id."});

    }




});

apiTehtavatRouter.put("/:id", async (req : express.Request, res : express.Response) => {

    if (await prisma.tehtava.count({
        where : {
            id : Number(req.params.id)
        }
    })) {

        try {

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
    
        } catch (e : any) {

            res.status(500).json({"virhe" : "Palvelimella tapahtui odottamaton virhe."})

        }

    } else {

        res.status(400).json({ "virhe" : "Virheellinen id."});

    }   

});

apiTehtavatRouter.post("/", async (req : express.Request, res : express.Response) => {

    if (Boolean(req.body.nimi) && (Boolean(req.body.suoritettu) === true || Boolean(req.body.suoritettu === false))) {

        try {

            await prisma.tehtava.create({
                data: {
                        nimi : req.body.nimi,
                        suoritettu : Boolean(req.body.suoritettu)
                }
            });
        
            res.json(await prisma.tehtava.findMany());

        } catch (e : any) {

            res.status(500).json({"virhe" : "Palvelimella tapahtui odottamaton virhe."})

        }

    } else {

        res.status(400).json({ "virhe" : "Virheelinen pyynnön body" });

    }


});

apiTehtavatRouter.get("/", async (req : express.Request, res : express.Response) => {

    try {

        res.json(await prisma.tehtava.findMany());

    } catch (e : any) {

        res.status(500).json({"virhe" : "Palvelimella tapahtui odottamaton virhe."})

    }
    

});

export default apiTehtavatRouter;