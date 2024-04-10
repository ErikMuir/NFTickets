import { FormControl, TextField } from "@mui/material";
import { FormControlProps } from "./formControlTypes";

export type IterationTextFieldProps = {
  value?: string;
  setValue: (newValue: string) => void;
};

export const IterationTextField = ({
  value,
  setValue,
}: FormControlProps<string | undefined>) => {
  return (
    <FormControl fullWidth>
      <TextField
        id="iteration"
        label="Iteration"
        variant="outlined"
        value={value}
        onChange={(event) => {
          setValue(event.target.value || undefined);
        }}
      />
    </FormControl>
  );
};
