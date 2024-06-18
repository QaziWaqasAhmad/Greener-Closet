import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({handleOnChange,value,categories,name,label}) {
  

  
  return (
    <Box sx={{ minWidth: 280 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleOnChange}
          name={name}
        >
          {categories?.map((item,ind)=>{
            return(
              <MenuItem value={item?.name}>{item?.name}</MenuItem>
            )
          })}
         
        </Select>
      </FormControl>
    </Box>
  );
}
