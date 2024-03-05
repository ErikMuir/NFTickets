export default function Attendee() {
  return (
    <div className="flex flex-col gap-8 max-w-1/2">
      <p className="text-2xl">
        As a web3 platform, we don&apos;t believe in collecting and
        persisting any off-chain data about our users. That&apos;s
        such a web2 paradigm.
      </p>
      <p className="text-2xl">
        The only thing we store about you is your wallet address and
        your role*. Everything else is on-chain.
      </p>
      <p className="text-sm">
        * The three user roles are <strong>attendee</strong>,{" "}
        <strong>entertainer</strong>, and <strong>venue</strong>.
        If you are an entertainer or a venue, please contact{" "}
        <a href="mailto:" className="text-primary hover:underline">
          support
        </a>{" "}
        to request that your role be updated accordingly. Please include your
        wallet address and your desired role. Once you have a role other than
        &quot;attendee&quot;, you will be able to update your profile information here.
      </p>
    </div>
  );
}
