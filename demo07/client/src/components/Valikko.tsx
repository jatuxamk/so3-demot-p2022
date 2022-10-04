import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Valikko : React.FC = () : React.ReactElement => {
  return (
    <>
    <CssBaseline />
    <AppBar position='static'>
      <Toolbar>
          <Typography variant='h6'>Demo7: Context API</Typography>
      </Toolbar>
    </AppBar>
    </>
  )
}


export default Valikko;