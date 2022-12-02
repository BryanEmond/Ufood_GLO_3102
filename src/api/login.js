import Cookies from "js-cookie";
import { ENDPOINT } from "./endpoint";
export const logout = async (token) => {
  const tokenInfo = await getTokenInfo(token);
  console.log(tokenInfo);
  try {
    const response = await fetch(`${ENDPOINT}/logout`, {
      method: "POST",
    });
    Cookies.remove("token");
    return response;
  } catch (e) {
    return e;
  }
};
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
export const getTokenInfo = async (token) => {
  console.log(token);
  try {
    const response = await fetch(`${ENDPOINT}/tokenInfo`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const checktoken = async (value) => {
  try {
    const response = await fetch(`${ENDPOINT}/tokenInfo`, {
      method: "GET",
      headers: {
        Authorization: value,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
