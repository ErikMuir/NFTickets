import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Select } from "@/components/common/Select";
import { BaseModalProps } from "@/components/component-types";
import Modal from "@/components/globals/Modal";
import { Role } from "@/models";
import { capitalizeFirstLetter } from "@/utils/common/strings";
import usePartnerOptions from "@/lib/providers/usePartnerOptions";
import { fetchStandardJson } from "@/lib/fetch-json";

export type CreateEventModalProps = BaseModalProps & {
  providerRole: Role;
};

export const CreateEventModal = ({
  id,
  show,
  onClose,
  providerRole,
}: CreateEventModalProps) => {
  let partnerRole: Role;
  switch (providerRole) {
    case Role.ENTERTAINER:
      partnerRole = Role.VENUE;
      break;
    case Role.VENUE:
      partnerRole = Role.ENTERTAINER;
      break;
    default:
      throw new Error("Not a valid provider role.");
  }
  const [partner, setPartner] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { partnerOptions, isLoading } = usePartnerOptions(partnerRole);

  const submit = () => {
    setIsSubmitting(true);
    setError(undefined);
    try {
      fetchStandardJson(`/api/events`, {
        method: "POST",
        body: JSON.stringify({ partnerRole, partner }),
      });
      onClose();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal id={id} show={show} onClose={onClose} title="Choose a Partner">
      <div className="flex flex-col items-center" style={{ maxWidth: 400 }}>
        <Select
          id="create-event-provider-select"
          label={capitalizeFirstLetter(partnerRole)}
          value={partner}
          onChange={(e) => {
            setPartner(e.target.value);
          }}
          options={partnerOptions}
          fullWidth
          disabled={isLoading}
        />
        <LoadingButton
          onClick={submit}
          variant="contained"
          color="primary"
          className="rounded bg-primary"
          disabled={isLoading || !partner}
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
        <div>{error}</div>
      </div>
    </Modal>
  );
};
