import React from 'react';
import { Button } from '@mui/material';

const defaultButtonStyle = {
  backgroundColor: '#007bff',
  color: '#ffffff', 
};

const Buttons = ({ name, className, onClick }) => {
  return (
    <Button
      type="button"
      variant="contained"
      style={{ ...defaultButtonStyle }}
      className={className}
      onClick={onClick}
      draggable="false"
    >
      {name}
    </Button>
  );
}

export default Buttons;
