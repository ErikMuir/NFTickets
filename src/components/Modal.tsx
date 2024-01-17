import { Close } from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export const Modal = ({
  show,
  onClose,
  children,
  title,
  className,
  showClose,
}: {
  show: boolean;
  onClose: () => void;
  children: any;
  title: string | undefined;
  className?: string;
  showClose?: boolean;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const modalWrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const backDropHandler = useCallback(
    (event: any) => {
      if (modalWrapperRef?.current && !modalWrapperRef?.current?.contains(event.target)) {
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
      className="modal-overlay fixed top-0 left-0 w-full h-full overflow-x-hidden flex justify-center items-center z-10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className={`modal-wrapper ${className}`} ref={modalWrapperRef}>
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
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!);
  } else {
    return null;
  }
};

export default Modal;
