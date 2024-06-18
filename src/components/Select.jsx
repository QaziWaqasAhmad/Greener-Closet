import * as React from 'react';
import { useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function MultipleSelectCheckmarks({names,material,setMaterial,materialQuantities,setMaterialQuantities}) {
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newMaterials = typeof value === 'string' ? value.split(',') : value;

    console.log(newMaterials,"newMaterialsnewMaterialsnewMaterials");
    // Update material state
    setMaterial(newMaterials);

    // Update materialQuantity state
    const updatedMaterialQuantity = { ...materialQuantities };
    material.forEach((mat) => {
      if (!newMaterials.includes(mat)) {
        delete updatedMaterialQuantity[mat];
      }
    });
    setMaterialQuantities(updatedMaterialQuantity);

  };

  useEffect(() => {
    const updatedMaterialQuantities = Object.fromEntries(
      Object.entries(materialQuantities).filter(([key]) => material.includes(key))
    );

    // Only update if there is a change to avoid infinite loop
    if (JSON.stringify(updatedMaterialQuantities) !== JSON.stringify(materialQuantities)) {
      setMaterialQuantities(updatedMaterialQuantities);
    }
  }, [material]);



  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={material}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={material?.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
