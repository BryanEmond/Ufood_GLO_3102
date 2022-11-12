const URL = "https://ufoodapi.herokuapp.com";

export const fetchClosestRestaurants = async (position) => {
  const fetchRestaurants = await fetch(`${URL}/unsecure/restaurants?lon=${-71.297516}&lat=${46.780953}`);
  // const fetchRestaurants = await fetch(`${URL}/unsecure/restaurants?lon=${position.longitude}&lat=${position.latitude}`);
  const json = await fetchRestaurants.json()
  return json.items
};
export const fetchFavoriteRestaurants = async (uid) => {
  const fetchRestaurants = await fetch(`${URL}/unsecure/users/:${uid}/favorites`);
  const json = await fetchRestaurants.json()
  return json.restaurants
};
export const fetchVisitsRestaurants = async (uid) => {
  const fetchRestaurants = await fetch(`${URL}/unsecure/users/:${uid}/restaurants/visits`);
  const json = await fetchRestaurants.json()
  return json.restaurants
};
export const fetchByRangePriceRestaurants = async (range) => {
  const fetchRestaurants = await fetch(`${URL}/unsecure/restaurants?price_range=${range}`)
  const json = await fetchRestaurants.json()
  return json.items
};
export const fetchGenresRestaurants = async (cat) => {
  // const fetchRestaurants = await fetch(`${URL}/unsecure/restaurants?lon=${-71.297516}&lat=${46.780953}`);
  const fetchRestaurants = await fetch(`${URL}/unsecure/restaurants?genres=${cat}`);
  const json = await fetchRestaurants.json()
  return json.items
};