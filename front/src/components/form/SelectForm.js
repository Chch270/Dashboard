import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const SelectForm = ({ name, value, change, items, defaultValue }) => {

    return (
        <FormControl sx={{ m: 1, Width: 120 }}>
            <InputLabel>{name}</InputLabel>
            <Select
                style={{ width: 200 }}
                value={defaultValue ? defaultValue : value}
                onChange={change}
                input={<OutlinedInput label={name} />}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {items.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectForm;