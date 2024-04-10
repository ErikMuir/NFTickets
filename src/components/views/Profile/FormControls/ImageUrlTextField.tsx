import { FormControl, TextField } from "@mui/material";
import { FormControlProps } from "./formControlTypes";

export const ImageUrlTextField = ({
  value,
  setValue,
}: FormControlProps<string | undefined>) => {
  return (
    <FormControl fullWidth>
      <TextField
        id="image-url"
        label="Image URL"
        variant="outlined"
        value={value}
        onChange={(event) => {
          setValue(event.target.value || undefined);
        }}
      />
    </FormControl>
  );
};
