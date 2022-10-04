import { Container, List, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { UutinenContext, Uutinen as UutinenT } from '../context/UutinenContext';
import Uutinen from './Uutinen';

const UutisLista : React.FC = () : React.ReactElement => {

    const { uutiset } = useContext(UutinenContext);

    return (
        <Container>
        
        <Typography variant='h5' sx={{marginTop: "20px"}}>Ylen tuoreimmat uutiset</Typography>

        <Typography variant='body2'>Päivitetty: ??</Typography>

        <List>
        {uutiset.map((uutinen : UutinenT, idx : number) => {

            return (
                <Uutinen key={idx}/>
            ) 

        })}
        </List>


        </Container>
    )
}

export default UutisLista;