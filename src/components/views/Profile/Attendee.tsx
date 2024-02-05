export default function Attendee() {
  return (
    <div className="flex flex-col max-w-1/2 gap-8">
      <p>
        As a web3 platform, we don't believe in collecting and persisting any
        off-chain information about our users. That's such a web2 paradigm. The
        only thing we store about you is your wallet address and your role.
      </p>
      <p>
        The three user roles are <strong>attendee</strong>,{" "}
        <strong>entertainer</strong>, and <strong>venue</strong>. If you are an
        entertainer or venue, please contact{" "}
        <a href="mailto:" className="text-primary hover:underline">
          support
        </a>{" "}
        to request that your role be updated accordingly. Please include your
        wallet address and your desired role. Once you have a role other than
        "attendee", you will be able to update your profile information here.
      </p>
    </div>
  );
}
