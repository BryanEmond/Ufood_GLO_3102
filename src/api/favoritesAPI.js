import { ENDPOINT_UNSECURE } from "./endpoint";
import { ENDPOINT } from "./endpoint";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const getAllFavorites = async () => {
  const response = await fetch(`${ENDPOINT_UNSECURE}/favorites`, {
    method: "GET",
  });
  const data = await response.json();
  return data.items;
};

export const getList = async (id) => {
  const response = await fetch(`${ENDPOINT_UNSECURE}/favorites/${id}`, {
    method: "GET",
  });

  const data = await response.json();
  return data.items;
};

export const getListsFromUser = async (id) => {
  const response = await fetch(`${ENDPOINT_UNSECURE}/users/${id}/favorites/`, {
    method: "GET",
  });

  const data = await response.json();
  return data.items;
};

export const createList = async (name, owner) => {
  const response = await fetch(`${ENDPOINT}/favorites`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: token,
    },
    body: JSON.stringify({ name: name }),
  });

  if (response.status != 201) {
    console.log("Error while creating list");
    return;
  }
  console.log("List created id: " + response.id);
  console.log(response);

  return response.data;
};

export const renameList = async (newName, owner, listId) => {
  const response = await fetch(`${ENDPOINT}/favorites/${listId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: token,
    },
    body: JSON.stringify({ name: newName }),
  });

  if (response.status != 200) {
    console.log("Error while renaming list");
    return;
  }
  console.log("List renamed id: " + response.id);
};

export const deleteList = async (listId) => {
  const response = await fetch(`${ENDPOINT}/favorites/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: token,
    },
  });

  if (response.status != 200) {
    console.log("Error while deleting list");
    return;
  }
  console.log("list deleted ");
};

export const addToList = async (listId, restaurantId) => {
  const response = await fetch(`${ENDPOINT}/favorites/${listId}/restaurants`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: token,
    },
    body: JSON.stringify({ id: restaurantId }),
  });

  if (response.status != 200) {
    console.log("Error while adding to list");
    return;
  }
  console.log("restaurant added");
  return response.data;
};

export const removeFromList = async (listId, restaurantId) => {
  const response = await fetch(
    `${ENDPOINT}/favorites/${listId}/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: token,
      },
    }
  );

  if (response.status != 200) {
    console.log("Error while removing from list");
    return;
  }
  console.log("restaurant removed");

  return response.data;
};
