import ArticleIcon from '@mui/icons-material/Article';
import { Dialog, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Uutinen : React.FC = () : React.ReactElement => {
  return (
    <ListItem component={Link} to={`/uutinen/2`}>
      <ListItemIcon>
        <ArticleIcon />   
      </ListItemIcon>
      <ListItemText 
        primary="Uutinen"
        secondary="4.10.2022"
      />
    </ListItem>
  )
}

export default Uutinen;