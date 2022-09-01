import React, { useEffect, useRef, useState } from 'react';
import {Alert, Button, CircularProgress, Container, List, ListItem, ListItemText, Stack, Typography, TextField} from '@mui/material';

interface Tehtava {
  id : number
  nimi : string
  suoritettu : boolean
}

interface ApiData {
  tehtavat : Tehtava[]
  haettu : boolean
  virhe : string
}

const App : React.FC = () : React.ReactElement => {

  const [apiData, setApiData] = useState<ApiData>({
    tehtavat : [],
    haettu : false,
    virhe : ""
  });

  const uusiTehtava = useRef<any>();

  const lisaaTehtava = () : void => {

    apiKutsu("POST", uusiTehtava.current!.value);

  }

  const apiKutsu = async (metodi? : string, data? : string) : Promise<void> => {

    let asetukset : any = {
      method : metodi || "GET"
    }

    if (metodi === "POST") {

      asetukset = {
        ...asetukset,
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({
                nimi : data,
                suoritettu : false
        })
      }

    } 

    const yhteys = await fetch("/api/tehtavat", asetukset);

    const vastaanotettuData = await yhteys.json();

    if (yhteys.status === 200) {

      setApiData({
        ...apiData,
        tehtavat : vastaanotettuData,
        haettu : true 
     });

    } else {
      setApiData({
        ...apiData,
        haettu : true, 
        virhe : "Palvelin ei vastaa."
     });
    }



  }

  useEffect(() => {

    apiKutsu();

  }, []);

  return (
    <Container maxWidth="sm">

      <Typography variant="h5">Demo 0: Kertausta</Typography>

      <Typography
        sx={{
          marginTop : "5px",
          fontSize : "14pt"
        }}
      >Tehtävälista</Typography>

      <Stack>

      {(apiData.haettu === false) 
        ? <CircularProgress /> 
        : (Boolean(apiData.virhe)) 
            ? <Alert color="error">{apiData.virhe}</Alert>
            : <List>
              {apiData.tehtavat.map((tehtava : Tehtava, idx : number) => {
              return <ListItem key={idx}>
                        <ListItemText>{tehtava.nimi}</ListItemText>
                      </ListItem>
              })}
              </List>
      }

      <TextField
      inputRef={uusiTehtava}
        variant="outlined"
        placeholder='Uusi tehtävä..'
      ></TextField>

      <Button 
        sx={{
          marginTop : "10px"
        }}
        variant="contained"
        size='large'
        onClick={lisaaTehtava}
      >Lisää tehtävä</Button>


      </Stack>

    </Container>
  );
}

export default App;
