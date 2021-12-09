import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SelectForm from 'components/form/SelectForm';
import { DefaultWidgets } from 'utils/Constants'
import './Form.css'
import APIRequest from 'utils/APIRequest';

const CreationForm = ({ open, handleClose, success }) => {
  const [widget, setWidget] = useState('');
  const [option, setOption] = useState('');
  const [optionnal, setOptionnal] = useState('');
  const [time, setTime] = useState(10);

  const changeWidget = (event) => {
    setWidget(event.target.value);
  };

  const verifyContent = async () => {
    try {
      console.log(optionnal);
      const data = await APIRequest.getUserProfile();
      const res = await APIRequest.CreateWidget(data.id.toString(), widget, option, optionnal, time === 0 ? '1' : time.toString());
      success(res, true);
      setWidget('');
      setOption('');
      setOptionnal('');
      setTime(10);
    } catch (error) {
      console.log(error);
      success([], false);
    }
    handleClose();
  }

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Create widget</DialogTitle>
      <DialogContent>
        <Box component="form" className="boxForm">
          <SelectForm name="Widget *" value={widget} change={changeWidget} items={DefaultWidgets} />
        </Box>
        <Box component="form" className="boxForm">
          <TextField
            required
            sx={{ m: 1, Width: 120 }}
            label="Parameter 1"
            defaultValue=""
            onChange={(event) => { setOption(event.target.value); }}
          />
          <TextField
            sx={{ m: 1, Width: 120 }}
            label="Parameter 2"
            defaultValue=""
            onChange={(event) => { setOptionnal(event.target.value); }}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              value={time}
              onChange={(event) => { setTime(event.target.value); }}
              endAdornment={<InputAdornment position="end">s</InputAdornment>}
              inputProps={{
                'aria-label': 'weight',
              }}
            >
            </OutlinedInput>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={verifyContent}>Confirm</Button>
      </DialogActions>
    </Dialog >
  );
}

export default CreationForm