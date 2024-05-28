import { useRouter } from "next/navigation";
import useUser from "@/lib/user/useUser";
import useEvent from "@/lib/events/useEvent";
import { Button } from "@/components/common/Button";
import { Loading } from "@/components/common/Loading";
import { RoleAccountProps } from "@/components/component-types";
import NotFound from "@/components/views/NotFound";
import Unauthorized from "@/components/views/Unauthorized";
import { Role } from "@/models";
import { ArrowBack, Edit } from "@mui/icons-material";
import { toFriendlyDateTime } from "@/utils/common/dates";
import { twMerge } from "tailwind-merge";
import { getEventStatusClassName } from "@/utils/client/style-helpers";
import { useState } from "react";
import { EventFunctionCall, setDateTime } from "@/clients/hedera/event-client";
import Modal from "../globals/Modal";
import { EditEventModal } from "../globals/EditEventModal";

export type ProviderEventProps = RoleAccountProps & {
  address: string;
};

export const noopEventFunctionCall: EventFunctionCall = async () => false;

export default function ProviderEvent({
  address,
  role,
  account,
}: ProviderEventProps) {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: event, isLoading: isEventLoading } = useEvent(address);
  const [modalProperty, setModalProperty] = useState<string>("");
  const [modalValue, setModalValue] = useState<string>("");
  const [modalAction, setModalAction] = useState<EventFunctionCall>(
    noopEventFunctionCall
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  if (isUserLoading || isEventLoading) return <Loading />;

  if (!event) return <NotFound />;

  if (
    !user?.isLoggedIn
    // TODO : uncomment these lines after testing
    // || (role === Role.ENTERTAINER && account !== event.entertainer.account)
    // || (role === Role.VENUE && account !== event.venue.account)
  )
    return <Unauthorized />;

  // const { finalized } = event;
  const finalized = !event.finalized;

  const unsetMsg = "* unset *";
  const dateTime = event.dateTime
    ? toFriendlyDateTime(event.dateTime)
    : unsetMsg;
  const salesBegin = event.dateTime
    ? toFriendlyDateTime(event.salesBegin)
    : unsetMsg;
  const salesEnd = event.dateTime
    ? toFriendlyDateTime(event.salesEnd)
    : unsetMsg;

  return (
    <div className="flex flex-col max-w-[960px] mx-auto p-4 items-center">
      <div className="flex flex-row pt-4 pb-12">
        <div className="absolute left-4">
          <Button
            variant="text"
            color="primary"
            className="rounded-full"
            onClick={router.back}
          >
            <ArrowBack fontSize="large" />
          </Button>
        </div>
        <div className="text-6xl">Event</div>
      </div>
      {showModal && (
        <EditEventModal
          id="edit-event"
          show={showModal}
          showClose={false}
          onClose={() => {
            setModalProperty("");
            setModalValue("");
            setModalAction(noopEventFunctionCall);
            setShowModal(false);
          }}
          eventAddress={""}
          callerAddress={""}
          propertyName={modalProperty}
          initialValue={modalValue}
          action={modalAction}
        />
      )}
      <div className="flex flex-col max-w-[960px] mx-auto items-center gap-2">
        <table width="100%" cellSpacing={0} cellPadding={12}>
          <tr>
            <td className="font-bold pr-8">Address</td>
            <td>{event.address}</td>
          </tr>
          <tr>
            <td className="font-bold pr-8">Entertainer</td>
            <td>
              {event.entertainer.name} ({event.entertainer.account})
            </td>
          </tr>
          <tr>
            <td className="font-bold pr-8">Venue</td>
            <td>
              {event.venue.name} ({event.venue.account})
            </td>
          </tr>
          <tr>
            <td className="font-bold pr-8">Event Date</td>
            <td>
              {dateTime}
              {!finalized && (
                <Button
                  className="ml-4 p-0 min-w-0 hover:bg-off-white"
                  variant="text"
                  color="primary"
                  onClick={() => {
                    setModalProperty("dateTime");
                    setModalValue(event.dateTime || "");
                    setModalAction(setDateTime);
                    setShowModal(true);
                  }}
                >
                  <Edit fontSize="small" />
                </Button>
              )}
            </td>
          </tr>
          <tr>
            <td className="font-bold pr-8">Sales Begin</td>
            <td>{salesBegin}</td>
          </tr>
          <tr>
            <td className="font-bold pr-8">Sales End</td>
            <td>{salesEnd}</td>
          </tr>
          <tr>
            <td className="font-bold pr-8">Status</td>
            <td
              className={twMerge(
                getEventStatusClassName(event.status),
                "border-2 font-bold"
              )}
            >
              {event.status}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
