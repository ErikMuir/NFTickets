import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Close } from "@mui/icons-material";
import { twMerge } from "tailwind-merge";
import { BaseModalProps } from "@/components/component-types";

export const Modal = ({
  id,
  show,
  onClose,
  title,
  className,
  showClose,
  children,
}: PropsWithChildren<BaseModalProps>) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const modalWrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const backDropHandler = useCallback(
    (event: any) => {
      if (
        modalWrapperRef?.current &&
        !modalWrapperRef?.current?.contains(event.target)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    setIsBrowser(true);
    window.addEventListener("click", backDropHandler);
    return () => window.removeEventListener("click", backDropHandler);
  }, [backDropHandler]);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div
      id={`${id}-modal`}
      className={twMerge(
        "modal-overlay",
        "fixed top-0 left-0 z-10",
        "w-full h-full overflow-x-hidden",
        "flex justify-center items-center",
        "bg-black/60"
      )}
    >
      <div
        className={twMerge("modal-wrapper", className)}
        ref={modalWrapperRef}
      >
        <div className="modal relative p-8 pb-12 rounded-xl bg-white z-10 shadow-md">
          {showClose && (
            <Close
              className="absolute top-0 right-0 m-4 cursor-pointer"
              onClick={handleCloseClick}
            />
          )}
          <div className="text-2xl font-light text-center my-4">{title}</div>
          {children}
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

export default Modal;
