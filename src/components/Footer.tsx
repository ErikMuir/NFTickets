export const Footer = () => {
  return (
    <footer className="shrink-0 mt-12">
      <div
        className="flex flex-wrap items-center justify-stretch px-2 py-4"
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex grow gap-4 items-center mobile-justify-center mx-4">
        </div>
        <div className="grow md:grow-0 text-center mx-4 text-text-secondary text-xs">
          <span className="whitespace-nowrap">NFTicket</span>{" "}
          <span className="whitespace-nowrap">&copy; Copyright {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
