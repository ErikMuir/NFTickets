import { Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Modal from "./Modal";

export const ConnectModal = ({
  show,
  onClose,
  onSubmit,
  extensionAvailable,
  pairingString,
  isAuthenticating,
}: {
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
    <Modal onClose={onClose} show={show} title="Connect your HashPack Wallet">
      <div className="flex flex-col items-center" style={{ maxWidth: 400 }}>
        <div className="flex flex-col items-center">
          <LoadingButton
            onClick={onSubmit}
            variant="contained"
            className="rounded bg-primary hover:bg-violet-700"
            disabled={!extensionAvailable}
            loading={isAuthenticating}
          >
            Connect with Extension
          </LoadingButton>
          {!extensionAvailable && (
            <p className="text-xs">
              <a href="https://www.hashpack.app/download" className="hover:underline">
                HashPack
              </a>{" "}
              extension is not installed in your browser
            </p>
          )}
        </div>
        <div className="flex flex-col items-center mt-12">
          <div className="text-md font-light">- OR -</div>
          <div className="flex flex-wrap gap-2 justify-center mt-12">
            <TextField
              value={pairingString || ""}
              InputProps={{
                readOnly: true,
              }}
              label="Pairing String"
            />
            <Button size="small" className="text-primary" onClick={handleCopy}>
              Copy
            </Button>
          </div>
          <ol className="text-left text-xs px-4 mt-4 list-decimal w-3/4">
            <li>Copy pairing string</li>
            <li>
              Log in to{" "}
              <a href="https://www.hashpack.app/download" className="hover:underline">
                HashPack
              </a>{" "}
              and click &quot;Connect DApp&quot;
            </li>
            <li>Paste the code into the &quot;Pairing String&quot; field</li>
            <li>Select the wallet you want to connect with and choose &quot;Approve&quot;</li>
          </ol>
        </div>
      </div>
    </Modal>
  );
};
