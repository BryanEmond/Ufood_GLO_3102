import Cookies from "js-cookie";
import { ENDPOINT } from "./endpoint";
const token = Cookies.get("token");
export const followUser = async (user) => {
  console.log(user);
  let body = JSON.stringify({ id: user });
  console.log(body);
  const response = await fetch(`${ENDPOINT}/follow`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
    body: body,
  });
  console.log(response);
  return true;
};
export const unfollowUser = async (user) => {
  const response = await fetch(`${ENDPOINT}/follow/${user}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  return response;
};
