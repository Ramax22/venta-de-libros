window.addEventListener("load", function () {
    var formulario = document.querySelector("#form-edit");
    alert("esta seguro de que quiere editar?")
    if (formulario) {
       formulario.addEventListener("submit", function (e) {
        e.preventDefault();
          //creamos el array de errores
         let errores = [];
 
          let camponame = document.querySelector("#title");
          if (camponame.value == "") {
             errores.push("El campo Titulo no puede estar vacio")
          }
 
          let campoPrice = document.querySelector("#price");
 
          if (campoPrice.value == "") {
             errores.push("El campo Precio no puede estar vacio")
          } else
             if (campoPrice.value < 0) {
                errores.push("El Precio debe ser mayor a cero")
             }
 
 
          let campoDiscount = document.querySelector("#discount");
          if (campoDiscount.value == "") {
             errores.push("El campo Descuento no puede estar vacio")
          } else
             if (campoDiscount.value < 0) {
                errores.push("El Descuento no puedo ser menor a cero")
             }
 
          let campoDate = document.querySelector("#date");
          if (campoDate.value == "") {
             errores.push("Debe seleccionar una fecha")
          } else
        //   var hoy = new Date();
        //   var day = hoy.getDate();
        //   var month = hoy.getMonth() + 1;
        //     var year = hoy.getFullYear();
 
        //         var fecha = day + '-' + month + '-' + year;
        //         console.log(fecha)

          
             if (campoDate.value!= new Date()){
                // function validafecha(date) {
                //    var x = new Date();
                //    var fecha = date.split("/");
                //    x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
                //    var hoy = new Date();
 
                //    if (x <= hoy)
                //       return false;
 
                // }
             
               
             errores.push("La fecha debe ser igual o menor a " )
             }
        
          let campoDescription = document.querySelector("#description");
          if (campoDescription.value == "") {
             errores.push("Debe agregar una descripción")
          }
         // en caso de encontrar errores
          if (errores.length > 0) {
             e.preventDefault();
             
             const divErrores = document.querySelector("div.errores");
                divErrores.style.borderRadius = "8px"
                divErrores.style.boxShadow = "inset 0 0 5px 0 red"
                const titulo = document.querySelector("h6");
                titulo.innerHTML = "Encontramos algunos errores:"
             const ulErrores = document.querySelector("div.errores ul");
             ulErrores.style.color = "red";
             ulErrores.style.listStyle="none"
             
 
             //recorremos el array para imprimir  los errores
 
             for (let i = 0; i < errores.length; i++) {
 
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
 
             }
 
          }
 
        })
    }
 
 })