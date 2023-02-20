import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BasicMenu from './BasicMenu'

export default function ButtonAppBar({users, currentUser, setCurrentUser}) {
  return (
    <Box
    
    sx={{ 
      flexGrow: 1,
      m:0,
      
      }}>
      <AppBar
      

      sx={{ 
        backgroundColor: "#3f51b5",
        justifyContent: "space-between",
        display:'flex',
        m:"0",
      }}
      
      position="static">
        <Toolbar
         sx={{
          display:'flex',
          justifyContent: 'space-between'

        }}
        >

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {currentUser ? `Üdvözlünk ${currentUser.name}!` : "Kérjük válasszon felhasználót!"}
          </Typography>
          { users &&
            <BasicMenu {...{users, currentUser, setCurrentUser}} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}