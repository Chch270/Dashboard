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

const ModificationForm = ({ widgetParam, open, handleClose, success }) => {
  const [widget, setWidget] = useState('');
  const [option, setOption] = useState('');
  const [optionnal, setOptionnal] = useState('');
  const [time, setTime] = useState(10);

  const verifyContent = async () => {
    try {
      console.log("yes", optionnal, widgetParam.param2);
      success({
        'id': widgetParam.id,
        'type': widget ? widget : widgetParam.type,
        'param1': option ? option : widgetParam.param1,
        'param2': optionnal ? optionnal : widgetParam.param2,
        'refreshTime': time ? time : widgetParam.refreshTime
      }, true);
    } catch (error) {
      console.log(error);
      success([], false);
    }
    handleClose(widgetParam);
  }

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Modify widget</DialogTitle>
      <DialogContent>
        <Box component="form" className="boxForm">
          <SelectForm name="Widget *" value={widget} change={(event) => { setWidget(event.target.value); }} defaultValue={widgetParam.type} items={DefaultWidgets} />
        </Box>
        <Box component="form" className="boxForm">
          <TextField
            required
            sx={{ m: 1, Width: 120 }}
            label="Option 1"
            defaultValue={widgetParam.param1}
            onChange={(event) => { setOption(event.target.value); }}
          />
          <TextField
            sx={{ m: 1, Width: 120 }}
            label="Option 2"
            defaultValue={widgetParam.param2}
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

export default ModificationForm