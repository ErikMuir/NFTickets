import { FormControl, TextField } from "@mui/material";
import { FormControlProps } from "./formControlTypes";

export const DescriptionTextField = ({
  value,
  setValue,
}: FormControlProps<string | undefined>) => {
  return (
    <FormControl fullWidth>
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={value}
        onChange={(event) => {
          setValue(event.target.value || undefined);
        }}
      />
    </FormControl>
  );
};
