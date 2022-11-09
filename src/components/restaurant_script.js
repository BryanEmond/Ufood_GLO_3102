
async function getInfo(name){
    const resp = await fetch(`https://ufoodapi.herokuapp.com/unsecure/restaurants/${name}`)
   const data = await resp.json()
   return data
}
async function addToList(listId, restaurantId){
    const response = await fetch(`https://ufoodapi.herokuapp.com/unsecure/favorites/${listId}/restaurants`, {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ id: restaurantId })
    });
    if (response.status != 200) {
        console.log("Error while adding to list");
        return;
    }
    console.log("restaurant added");
    console.log(data);
    return response.data;

}
async function removeFromList(listId,restaurantId){
    const response = await fetch(`https://ufoodapi.herokuapp.com/unsecure/favorites/${listId}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (response.status != 200) {
        console.log("Error while removing from list");
        return;
    }
    console.log("restaurant removed");
    console.log(data);

    return response.data;
}

module.exports={
    getInfo,
    addToList,
    removeFromList
}