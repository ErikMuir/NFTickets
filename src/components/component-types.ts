import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import { EventCategory } from "@/lib/events/event-helpers";
import { EventDto, Role } from "@/models";

export type Hidable = {
  isHidden?: boolean;
};

export type AccountProp = {
  account: string;
};

export type BaseFormControlProps = {
  id: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

export type TextFormControlProps = BaseFormControlProps & {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type SelectValue = string | number | readonly string[] | undefined;

export type SelectFormControlProps = BaseFormControlProps & {
  options: Record<string, SelectValue>;
  value?: SelectValue;
  onChange?: (e: SelectChangeEvent) => void;
};

export type EventsTabProps = {
  tab: EventCategory;
  currentTab: string;
  isLoading?: boolean;
  events: EventDto[];
};

export type BaseModalProps = {
  id: string;
  show: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  showClose?: boolean;
};

export type RoleAccountProps = {
  role: Role;
  account: string;
};
