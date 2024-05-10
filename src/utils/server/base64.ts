function encode(message: WithImplicitCoercion<string>) {
  return Buffer.from(message, "utf-8").toString("base64");
}

function decode(message: WithImplicitCoercion<string>) {
  return Buffer.from(message, "base64").toString("utf-8");
}

const base64 = {
  encode,
  decode,
};

export default base64;
