import React, { useState } from 'react';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';


interface Tehtava {
  id : number,
  nimi : string,
  suoritettu : boolean
}

const Tehtavalista : React.FC = () : React.ReactElement => {

  const [tehtavat] = useState<Tehtava[]>([{
                                            id : 1,
                                            nimi : "Käy kaupassa",
                                            suoritettu : false
                                          },
                                          {
                                            id : 2,
                                            nimi : "Siivoa",
                                            suoritettu : false
                                          },
                                          {
                                            id : 3,
                                            nimi : "Ulkoiluta koiraa",
                                            suoritettu : false
                                          }]);

  return (
    <List>
      {tehtavat.map((tehtava : Tehtava, idx : number) => {
        return (<ListItem
                    secondaryAction={<IconButton>
                                        <DeleteIcon />
                    </IconButton>}
                  >
                  <ListItemIcon>
                  <IconButton>
                    {(tehtava.suoritettu) ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                  </IconButton>
                  </ListItemIcon>
                  <ListItemText 
                    primary={tehtava.nimi}
                  />
                </ListItem>)
      })}
    </List>
  )
}

export default Tehtavalista;