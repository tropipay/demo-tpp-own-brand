import React, { useState } from "react";
import { Controller } from "react-hook-form";

import EyeIcon from '@mui/icons-material/RemoveRedEye';
import EyeOffIcon from '@mui/icons-material/VisibilityOff';

import { IconButton, Input, InputAdornment, TextField } from "@mui/material";

const FormTextField = ({ name, control, label, rules, placeholder, variant, type, size, className, decorator, multiline, rows }) => {
  placeholder = placeholder || '';
  rules = rules || {};
  variant = variant || "outlined";
  type = type || "text";
  size = size || "small";
  className = className || "";
  decorator = decorator || "";
  multiline = multiline || false;
  rows = rows  || (multiline ? 3 : 1)

  const [showpass, setShowpass] = useState(false);

  const handleClickShowPassword = () => {
    setShowpass(!showpass)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => decorator === "btnpass" ?
          <Input
            size={size}
            label={label}
            placeholder={placeholder}
            error={!!error} 
            onChange={onChange}
            value={value}
            className={className}
            fullWidth
            rows={rows}
            variant={variant}
            type={showpass ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showpass ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          :
          <TextField
            helperText={error ? error.message : null}
            size={size}
            label={label}
            placeholder={placeholder}
            error={!!error}
            onChange={onChange}
            value={value}
            type={type}
            className={className}
            multiline={multiline}
            rows={rows}
            fullWidth
            variant={variant}
          />
      }
    />
  );
};

export default FormTextField;