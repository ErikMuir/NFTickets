import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { EntertainerType } from "@/models";
import { FormControlProps } from "./formControlTypes";

export const EntertainerTypeSelect = ({
  value,
  setValue,
}: FormControlProps<EntertainerType>) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="type-label">Entertainer Type</InputLabel>
      <Select
        labelId="type-label"
        id="type"
        value={value}
        label="Entertainer Type"
        onChange={(event) => {
          setValue(event.target.value as EntertainerType);
        }}
      >
        <MenuItem value={EntertainerType.COMEDY}>
          {EntertainerType.COMEDY}
        </MenuItem>
        <MenuItem value={EntertainerType.MUSIC}>
          {EntertainerType.MUSIC}
        </MenuItem>
        <MenuItem value={EntertainerType.SPORTS}>
          {EntertainerType.SPORTS}
        </MenuItem>
      </Select>
    </FormControl>
  );
};
