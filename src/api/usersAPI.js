import { ENDPOINT_UNSECURE } from "./endpoint";
import { ENDPOINT } from "./endpoint";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const getUsers = async (query = "") => {
  const url = new URL(`${ENDPOINT}/users`);
  url.searchParams.append("q", query);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();
  return data.items;
};

export const getUserById = async (id) => {
  const response = await fetch(`${ENDPOINT}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();
  return data.items;
};
