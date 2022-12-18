import { ENDPOINT_UNSECURE } from "./endpoint";

export const getUsers = async (query = "") => {
  const url = new URL(`${ENDPOINT_UNSECURE}/users`);
  url.searchParams.append("q", query);

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  return data.items;
};

export const getUserById = async (id) => {
  const response = await fetch(`${ENDPOINT_UNSECURE}/users/${id}`, {
    method: "GET",
  });

  const data = await response.json();
  return data.items;
};
