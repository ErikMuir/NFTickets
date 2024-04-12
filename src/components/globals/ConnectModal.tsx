import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import { CopyAllOutlined } from "@mui/icons-material";

import Modal from "@/components/globals/Modal";

export const ConnectModal = ({
  id,
  show,
  onClose,
  onSubmit,
  extensionAvailable,
  pairingString,
  isAuthenticating,
}: {
  id?: string;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  extensionAvailable: boolean;
  pairingString: string;
  isAuthenticating: boolean;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(pairingString);
  };

  return (
    <Modal
      id={id}
      onClose={onClose}
      show={show}
      title="Connect your HashPack Wallet"
    >
      <div className="flex flex-col items-center" style={{ maxWidth: 400 }}>
        <div className="flex flex-col items-center">
          <LoadingButton
            onClick={onSubmit}
            variant="contained"
            color="primary"
            className="rounded bg-primary"
            disabled={!extensionAvailable}
            loading={isAuthenticating}
          >
            Connect with Extension
          </LoadingButton>
          {!extensionAvailable && (
            <p className="text-xs">
              <a
                href="https://www.hashpack.app/download"
                className="hover:underline"
              >
                HashPack
              </a>{" "}
              extension is not installed in your browser
            </p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-md font-light my-8">- OR -</div>
          <div className="flex items-center gap-2 w-full">
            <TextField
            className="grow"
              value={pairingString || ""}
              InputProps={{
                readOnly: true,
              }}
              label="Pairing String"
            />
            <IconButton
              size="small"
              color="primary"
              onClick={handleCopy}
            >
              <CopyAllOutlined />
            </IconButton>
          </div>
          <ol className="text-left text-xs px-4 mt-4 list-decimal w-3/4">
            <li>Copy pairing string</li>
            <li>
              Log in to{" "}
              <a
                href="https://www.hashpack.app/download"
                className="hover:underline"
              >
                HashPack
              </a>{" "}
              and click &quot;Connect DApp&quot;
            </li>
            <li>Paste the code into the &quot;Pairing String&quot; field</li>
            <li>
              Select the wallet you want to connect with and choose
              &quot;Approve&quot;
            </li>
          </ol>
        </div>
      </div>
    </Modal>
  );
};
