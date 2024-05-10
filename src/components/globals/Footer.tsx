export const Footer = () => {
  return (
    <footer className="shrink-0 mt-12">
      <div className="flex flex-wrap justify-between m-4 text-sm">
        <div>built on Hedera</div>
        <div>
          <span className="whitespace-nowrap">NFTickets</span>{" "}
          <span className="whitespace-nowrap">
            &copy; Copyright {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};
