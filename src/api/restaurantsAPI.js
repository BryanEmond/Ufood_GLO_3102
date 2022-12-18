import { ENDPOINT_UNSECURE, ENDPOINT } from "./endpoint";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const getInfo = async (name) => {
  const resp = await fetch(`${ENDPOINT_UNSECURE}/restaurants/${name}`);
  const data = await resp.json();
  return data;
};
export const getName = async (id) => {
  const resp = await fetch(`${ENDPOINT}/restaurants/${id}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
  if (resp.status != 200) {
    console.log(`Error occured with code ${resp.status}`);
    return null;
  }
  const data = await resp.json();
  return data;
};

export const searchClosestRestaurants = async (query, lon, lat) => {
  const fetchRestaurants = await fetch(
    `${ENDPOINT_UNSECURE}/restaurants?lon=${lon}&lat=${lat}&q=${query}`
  );
  const json = await fetchRestaurants.json();

  return json.items;
};
