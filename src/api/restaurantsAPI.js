import { ENDPOINT_UNSECURE } from "./endpoint";

export const getInfo = async (name) => {
  const resp = await fetch(`${ENDPOINT_UNSECURE}/restaurants/${name}`);
  const data = await resp.json();
  return data;
};
