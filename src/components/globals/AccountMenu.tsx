import {
  AccountBalanceWallet,
  ArrowDropDown,
  LinkOff,
  Person,
} from "@mui/icons-material";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { MessageTypes } from "hashconnect";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/common/Button";
import { ConnectModal } from "@/components/globals/ConnectModal";
import { hashconnect } from "@/lib/hashconnect";
import { getHashConnectWallet } from "@/lib/hashconnect/HashconnectWallet";
import useUser from "@/lib/user/useUser";

export const AccountMenu = () => {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setShowMenu(true);
    },
    [setAnchorEl]
  );

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  async function logoutSession(): Promise<void> {
    const userResponse = await fetch("/api/user/logout", { method: "POST" });
    if (userResponse.ok) {
      mutateUser({ isLoggedIn: false });
      setShowMenu(false);
      router.push("/");
    }
  }

  const handleProfile = () => {
    setShowMenu(false);
    router.push("/profile");
  };

  const handleDisconnect = () => {
    getHashConnectWallet()
      .disconnect()
      .then(() => logoutSession());
  };

  useEffect(() => {
    async function handleConnect(accountId: string): Promise<void> {
      setIsAuthenticating(true);
      return getHashConnectWallet()
        .authenticate(accountId)
        .then(({ user, errorMessage }) => {
          if (errorMessage) {
            console.error(errorMessage);
            getHashConnectWallet().disconnect();
          } else {
            mutateUser(user);
            setShowModal(false);
            router.push("/");
          }
        })
        .catch((e) => {
          console.error((e as Error).message);
          getHashConnectWallet().disconnect();
        })
        .finally(() => {
          setIsAuthenticating(false);
          setShowMenu(false);
        });
    }

    const onPairingEvent = (p: MessageTypes.ApprovePairing) => {
      if (p.accountIds[0]) {
        handleConnect(p.accountIds[0]);
      }
    };

    const onFoundExtension = () => {
      getHashConnectWallet().foundExtension();
    };

    const onFoundIframeEvent = () => {
      alert(
        "The Dapp browser is currently not supported! Please visit https://nftickets-beta.vercel.app on your browser."
      );
    };

    getHashConnectWallet()
      .initialize()
      .then(() => {
        hashconnect.pairingEvent?.on(onPairingEvent);
        hashconnect.foundExtensionEvent?.on(onFoundExtension);
        hashconnect.foundIframeEvent?.once(onFoundIframeEvent);
      })
      .catch((e) => console.error((e as Error).message));

    return () => {
      hashconnect.pairingEvent.off(onPairingEvent);
      hashconnect.foundExtensionEvent?.off(onFoundExtension);
      hashconnect.foundIframeEvent?.off(onFoundIframeEvent);
    };
  }, [mutateUser, router]);

  if (!user?.isLoggedIn) {
    return (
      <>
        <Button
          className="gap-2"
          variant="text"
          aria-controls="connect-modal"
          aria-haspopup="true"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div>Connect</div>
          <div className="flex items-center">
            <AccountBalanceWallet fontSize="small" />
            <ArrowDropDown fontSize="small" />
          </div>
        </Button>
        {showModal && (
          <ConnectModal
            id="connect"
            show={showModal}
            onClose={() => {
              setIsAuthenticating(false);
              setShowModal(false);
            }}
            onSubmit={() => {
              setIsAuthenticating(true);
              getHashConnectWallet().connectToLocalWallet();
            }}
            extensionAvailable={getHashConnectWallet().isExtensionAvailable}
            pairingString={
              getHashConnectWallet().connectionData?.pairingString ?? ""
            }
            isAuthenticating={isAuthenticating}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Button
        className="text-right inline-flex gap-2 hover:bg-inherit"
        variant="text"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
      >
        <div className="text-primary truncate">{user?.accountId}</div>
        <div className="text-primary flex items-center">
          <AccountBalanceWallet fontSize="small" />
          <ArrowDropDown fontSize="small" />
        </div>
      </Button>

      {showMenu && (
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted={false}
          open={showMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "accountMenuBtn",
          }}
          slotProps={{
            paper: {
              className: "w-80 max-w-full",
            },
          }}
        >
          <MenuList disablePadding={true}>
            <MenuItem
              className="flex items-center gap-4 hover:bg-violet-300"
              onClick={handleProfile}
            >
              <Person fontSize="medium" />
              Profile
            </MenuItem>
            <MenuItem
              className="flex items-center gap-4 hover:bg-violet-300"
              onClick={handleDisconnect}
            >
              <LinkOff fontSize="medium" />
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
