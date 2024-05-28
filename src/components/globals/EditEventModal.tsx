import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Select } from "@/components/common/Select";
import { BaseModalProps } from "@/components/component-types";
import Modal from "@/components/globals/Modal";
import { Role } from "@/models";
import { capitalizeFirstLetter } from "@/utils/common/strings";
import usePartnerOptions from "@/lib/providers/usePartnerOptions";
import { fetchStandardJson } from "@/lib/fetch-json";
import { ErrorMessage } from "../common/ErrorMessage";
import { EventFunctionCall } from "@/clients/hedera/event-client";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";

export type EditEventModalProps = BaseModalProps & {
  eventAddress: string;
  callerAddress: string;
  propertyName: string;
  initialValue: string;
  action: EventFunctionCall;
};

export const EditEventModal = ({
  id,
  show,
  showClose,
  onClose,
  eventAddress,
  callerAddress,
  propertyName,
  initialValue,
  action,
}: EditEventModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      await action(eventAddress, callerAddress, value);
      onClose();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      id={id}
      show={show}
      showClose={showClose}
      onClose={onClose}
      title={`Set ${propertyName}`}
    >
      <div className="flex flex-col items-center gap-4 w-[300px] max-w-[400px]">
        <TextField
          id={propertyName}
          value={value}
          onChange={(e) => {
            setValue(e.target.value.trim());
          }}
        />
        {error && <ErrorMessage message={error} />}
        <div className="flex flex-row gap-4">
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            onClick={submit}
            variant="contained"
            color="primary"
            className="rounded bg-primary"
            disabled={!value}
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
};
