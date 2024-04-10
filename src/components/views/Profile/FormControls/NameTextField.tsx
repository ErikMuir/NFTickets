import { FormControl, TextField } from "@mui/material";
import { FormControlProps } from "./formControlTypes";

export const NameTextField = ({ value, setValue }: FormControlProps<string>) => {
  return (
    <FormControl fullWidth>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </FormControl>
  );
};
