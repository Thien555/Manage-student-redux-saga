import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { Control, useController } from "react-hook-form";

export interface SelectOption {
  label?: string;
  value: number | string;
}
interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export const SelectFiled = ({
  name,
  control,
  label,
  options,
  disabled,
}: Props) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl
      fullWidth
      margin="normal"
      disabled={disabled}
      error={invalid}
      variant="outlined"
      size="small"
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
