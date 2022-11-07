const name = '5f31fc6555d7790550c08aff'
function getInfo(){
    const promise = new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest();
        request.open('GET',`https://ufoodapi.herokuapp.com/unsecure/restaurants/${name}`);
        request.send();
       

        request.onload = () =>{
         
            if(request.status === 200){

               
                resolve(request.response);
            }else{
                reject(request.statusText);
            }
        }
    });
    promise.then((data) =>{ 
    })
    
    return promise
    

}

module.exports={
    getInfo
}