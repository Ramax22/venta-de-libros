
window.addEventListener("load", function () {
   var formulario = document.querySelector("#form-create");
  
   if (formulario) {
      formulario.addEventListener("submit", function (e) {
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
               errores.push("El campo Precio debe ser mayor a cero")
            }


         let campoDiscount = document.querySelector("#discount");
         if (campoDiscount.value < 0) {
            errores.push("El Descuento no puedo ser menor a cero")
         }

         let campoDate = document.querySelector("#date");
         if (campoDate.value == "") {
            errores.push("Debe seleccionar una fecha")
         } else
            var hoy = new Date();
         var day = new Date(hoy).getDate();
         var month = new Date(hoy).getMonth() + 1;
         var year = new Date(hoy).getFullYear();

         var fecha = year + '-' + "0" + month + '-' + day;

         if (campoDate.value > fecha) {
            errores.push("La fecha debe ser igual o menor a " + fecha)
         }

         var image = document.querySelector("#image")

         if (image.value == "") {
            errores.push("Debe agregar una imagen")
         } else
            var archivo = image.value
         let extension = archivo.indexOf(".jpg")

         if (extension == -1) {
            errores.push("Extensión no válida")
         }



         let campoDescription = document.querySelector("#description");
         if (campoDescription.value == "") {
            errores.push("El campo descripción no puede estar vacio")
         }
         //en caso de encontrar errores
         if (errores.length > 0) {
            e.preventDefault();
            const titulo = document.querySelector("h6");
            titulo.innerHTML = "Encontramos algunos errores:"

            const ulErrores = document.querySelector("div.errores ul");
            ulErrores.style.color = "red";
            ulErrores.style.borderRadius = "15px"

            //recorremos el array para imprimir  los errores

            for (let i = 0; i < errores.length; i++) {

               ulErrores.innerHTML += "<li>" + errores[i] + "</li>"

            }

         }

      })
   }

})