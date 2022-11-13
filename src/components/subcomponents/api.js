import { getInfo } from "../restaurant_script";

const URL = "https://ufoodapi.herokuapp.com";

export const fetchClosestRestaurants = async (position) => {
  // const fetchRestaurants = await fetch(
  //   `${URL}/unsecure/restaurants?lon=${-71.297516}&lat=${46.780953}`
  // );
  const fetchRestaurants = await fetch(
    `${URL}/unsecure/restaurants?lon=${-71.228446}&lat=${46.834502}`
  );
  // const fetchRestaurants = await fetch(
  //   `${URL}/unsecure/restaurants?lon=${position.longitude}&lat=${position.latitude}`
  // );
  const json = await fetchRestaurants.json();
  return json.items;
};
export const fetchFavoriteRestaurants = async (uid) => {
  const fetchRestaurants = await fetch(
    `${URL}/unsecure/users/${uid}/favorites`
  );
  const json = await fetchRestaurants.json();
  let favList = [];
  for (let rest of json.items) {
    if (rest.restaurants.length !== 0) {
      for (let id of rest.restaurants) {
        favList.push(await getInfo(id.id));
      }
    }
  }
  return favList;
};
export const fetchByRangePriceRestaurants = async (range) => {
  const fetchRestaurants = await fetch(
    `${URL}/unsecure/restaurants?price_range=${range}`
  );
  const json = await fetchRestaurants.json();
  return json.items;
};
export const fetchGenresRestaurants = async (cat) => {
  const fetchRestaurants = await fetch(
    `${URL}/unsecure/restaurants?genres=${cat}`
  );
  const json = await fetchRestaurants.json();
  return json.items;
};
export const fetchVisitedRestaurants = async (uid) => {
  const fetchRestaurants = await fetch(
    `${URL}/unsecure/users/${uid}/restaurants/visits`
  );
  const json = await fetchRestaurants.json();
  return json.items;
};
export const fetchVisitsRestaurants = async (uid) => {
  const items = await fetchVisitedRestaurants(uid);
  let visitedList = [];
  for (let rest of items) {
    visitedList.push(await getInfo(rest.restaurant_id));
  }
  return visitedList;
};
