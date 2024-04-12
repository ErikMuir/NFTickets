import { FormControl, TextField as MuiTextField } from "@mui/material";
import { TextFormControlProps } from "../componentTypes";

export const TextArea = ({
  id,
  label,
  className,
  fullWidth,
  value,
  onChange,
}: TextFormControlProps) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <MuiTextField
        id={id}
        label={label}
        className={className}
        variant="outlined"
        multiline
        rows={4}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};
