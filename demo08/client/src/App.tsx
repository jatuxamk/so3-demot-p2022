import React from 'react';
import { Button, Container, Stack } from '@mui/material';
import Otsikko from './components/Otsikko';
import Tehtavalista from './components/Tehtavalista';


function App() {
  return (
    <Container>
      <Stack spacing={2}>
              
      <Otsikko />

      <Button 
        variant="contained"

      >Lisää uusi tehtävä</Button>

      <Tehtavalista />

      </Stack>
    </Container>
  );
}

export default App;
