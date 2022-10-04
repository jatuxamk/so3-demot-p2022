import { Button, Container, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UutinenContext } from '../context/UutinenContext';

const KokoUutinen : React.FC = () : React.ReactElement => {

  const koe = useContext(UutinenContext);

  return (
    <Container>

      <Stack spacing={2}>

      <Typography variant='h5' sx={{marginTop: "20px"}}>Uutisen otsikko</Typography>

      <Typography variant='body2'>Lorem ipsum...?? {JSON.stringify(koe)}</Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
      >Palaa listaukseen</Button>

      </Stack>

    </Container>
  )
}


export default KokoUutinen;