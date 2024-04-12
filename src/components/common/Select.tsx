import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { SelectFormControlProps, SelectValue } from "../componentTypes";

const coerceSelectValue = (value: SelectValue): string | undefined =>
  value === undefined ? undefined : `${value}`;

export const Select = ({
  id,
  label,
  className,
  fullWidth,
  value,
  onChange,
  options,
}: SelectFormControlProps) => {
  const labelId = `${id}-label`;
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        id={id}
        label={label}
        className={className}
        value={coerceSelectValue(value)}
        onChange={onChange}
      >
        {options &&
          Object.entries(options).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {key}
            </MenuItem>
          ))}
      </MuiSelect>
    </FormControl>
  );
};
