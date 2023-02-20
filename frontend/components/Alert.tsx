import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle'

export default function ActionAlerts({maskLeft}) {
  return (
    <Stack  sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
      <AlertTitle>Rendelés sikertelen!</AlertTitle>
    Már csak {maskLeft} db maszk áll rendelkezésre
      </Alert>
      
    </Stack>
  );
}