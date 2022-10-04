import { Container, Typography } from '@mui/material';
import React, { useState } from 'react'
import Uutinen from './Uutinen';

interface Uutinen {
    id : number,
    otsikko : string,
    sisalto? : string,
    julkaistu? : Date,
    kuva? : string,
    linkki? : string
}

const UutisLista : React.FC = () : React.ReactElement => {

    const [uutiset, setUutiset] = useState<Uutinen[]>([
                                                    {
                                                        id : 1,
                                                        otsikko : "Uutinen 1"
                                                    }
                                                    ,
                                                    {
                                                        id : 2,
                                                        otsikko : "Uutinen 3"
                                                    },
                                                    {
                                                        id : 3,
                                                        otsikko : "Uutinen 3"
                                                    }
                                                ]);

  return (
    <Container>
    
    <Typography variant='h5' sx={{marginTop: "20px"}}>Ylen tuoreimmat uutiset</Typography>

    <Typography variant='body2'>Päivitetty: ??</Typography>

    {uutiset.map((uutinen : Uutinen, idx : number) => {

        return (
            <Uutinen key={idx}/>
        ) 

    })}


    </Container>
  )
}

export default UutisLista;