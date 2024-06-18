import { TextField } from "@mui/material";
import React from "react";

const TextFeilds = ({ label, type, placeholder, id, className, size, value, onChange,name }) => {
  return (
    <>
      <div className="mb-3">
        <TextField
          id={id}
          type={type}
          label={label}
          placeholder={placeholder}
          className={className}
          size="small"
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </>
  );
};

export default TextFeilds;
