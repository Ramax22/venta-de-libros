window.addEventListener("load", function(){
    const formulario = document.querySelector("form-create");
   if(formulario) {formulario.addEventListener("submit", function(e){
        e.preventDefault();

    let errores= [];

    let camponame= document.querySelector("input.title");
    if(camponame.value==""){
        errores.push("el campo no puede")
    }

    if (errores.length>0){
        e.preventDefault();

        const ulErrores = document.querySelector("div.errores ul");
        for (let i = 0; i < errores.length; i++) {
           ulErrores.innerHTML = "<li>"+ errores[i]+ "</li>"
            
        }
    }

    })
}

})