import * as React from 'react';
import { useState } from 'react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MainContainer from './MainContainer'
import Modal from './Modal'




export default function AfterLogin({allHospital,everyHospital,currentUser,setCurrentUser,setTest}) {
    
    const [currentHospital, setCurrentHospital] = useState(allHospital[0])
    

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
   
  return (
    <>
    <Box
    sx={{
        display:"flex",
        alignItems: "center",
        m: "2em 0em",
    }}
    >
    <h1>{currentHospital?.name}</h1>
    { allHospital.length > 1 &&

    <>
    <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownIcon
        sx={{ 
            fontSize: 40,
            color: '#283593',
        }}
         />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {allHospital.map((hospital) => {
            return <MenuItem key={hospital.name} onClick={() => {handleClose() ; setCurrentHospital(hospital)}}>{hospital.name}</MenuItem>
        })}
      </Menu>
    </>
      }
    </Box>

      <MainContainer
      
      {...{currentHospital,everyHospital,currentUser,setCurrentUser}}
      />
    <Modal {...{everyHospital,currentUser,setCurrentUser,setTest}}/>
    </>
  );
}


