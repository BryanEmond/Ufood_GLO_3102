import { ENDPOINT } from "./endpoint";
export const createUser = async (name, email, password) => {
  const response = await fetch(`${ENDPOINT}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${name}&email=${email}&password=${password}`,
  });
  const json = await response.json();
  return json;
};
export const loginUser = async (email, password) => {
  const response = await fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${email}&password=${password}`,
  });
  const json = await response.json();
  return json;
};
