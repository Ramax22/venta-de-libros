window.onload = function(){

    //Vamos a sacar todos los países para el cliente de RESTCOUNTRIES
    fetch('https://restcountries.eu/rest/v2/all')
    
    .then(function(response){
        return response.json()
    })
    .then(function(information){
        
        let select = document.querySelector('.countries')

        /* --- RECORREMOS EL ARRAY --- */
        for(let i = 0; i < information.length; i++){

            select.innerHTML += '<option>' + information[i].name + '</option>' 

        }
    })
    .catch(function(error){
        console.log("Error: "+error)
    })       
}