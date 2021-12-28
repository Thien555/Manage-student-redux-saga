import { TextField } from "@material-ui/core";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export const InputFiled = ({ name, control, label, ...inputProps }: Props) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <TextField
      size="small"
      fullWidth
      label={label}
      margin="normal"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};
