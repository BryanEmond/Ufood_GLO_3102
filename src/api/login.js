import Cookies from "js-cookie";
import { ENDPOINT } from "./endpoint";
export const logout = async (token) => {
  const tokenInfo = await getTokenInfo(token);
  try {
    const response = await fetch(`${ENDPOINT}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${tokenInfo.email}&name=${tokenInfo.name}&token=${token}&id=${tokenInfo.id}`,
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
  try {
    const response = await fetch(`${ENDPOINT}/signup`, {
      method: "GET",
      headers: {
        authorization: value,
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    return e;
  }
};
export const checktoken = async (value) => {
  try {
    const response = await fetch(`${ENDPOINT}/signup`, {
      method: "GET",
      headers: {
        authorization: value,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
