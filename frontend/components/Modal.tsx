import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({everyHospital,currentUser,setCurrentUser,setTest}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newHospital,setNewHospital] = useState()


  const handleChange = (event) => {
    setNewHospital(event.target.value);
  };

  const handleSubmit = async() =>{
    const pickedHospital = everyHospital.filter(hospital => hospital.name === newHospital)
    await axios.post(`http://localhost:3000/users/newHospital/${currentUser.name}`,pickedHospital)
    setTest(prevState => !prevState)
  }

 const filteredHospital = everyHospital.filter(hospital => !currentUser.access.includes(hospital.id.toString()))



  return (
    <div>
      <Button onClick={handleOpen}>Új kórház felvétele</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Kérem válasszon kórházat</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="controlled-radio-buttons-group"
        defaultValue="female"
        value={newHospital}
        onChange={handleChange}
      >
        {filteredHospital.map(hospital => {
            return <FormControlLabel key={hospital.id} value={hospital.name} control={<Radio />} label={hospital.name} />
        })}

      </RadioGroup>
      <Button variant="outlined" onClick={()=>{handleSubmit(); handleClose()}}  disabled={!newHospital} endIcon={<SendIcon />}>Kórház felvétele</Button>
    </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
