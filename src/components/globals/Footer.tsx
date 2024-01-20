export const Footer = () => {
  return (
    <footer className="shrink-0 mt-12">
      <div className="flex flex-wrap items-center justify-stretch px-2 py-4 text-sm">
        <div className="flex grow gap-4 items-center mobile-justify-center mx-4">
          built on Hedera
        </div>
        <div className="grow md:grow-0 text-center mx-4 text-text-secondary">
          <span className="whitespace-nowrap">NFTickets</span>{" "}
          <span className="whitespace-nowrap">&copy; Copyright {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
