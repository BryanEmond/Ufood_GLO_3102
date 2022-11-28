async function getInfo(name) {
  const resp = await fetch(
    `https://ufoodapi.herokuapp.com/unsecure/restaurants/${name}`
  );
  const data = await resp.json();
  return data;
}

module.exports = {
  getInfo,
};
