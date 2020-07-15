window.addEventListener("load", function () {
   var formulario = document.querySelector("#form-edit");
   
   formulario.addEventListener("submit", function (e) {
      //creamos el array de errores
      let errores = false;

      let camponame = document.querySelector("input.form-control.box");

      if (camponame.value == "") {
         alert("El campo Titulo no puede estar vacio")
         errores = true;
      }

      let campoPrice = document.querySelector("input.form-control.price");

      if (campoPrice.value == "") {
         alert("El campo precio no puede estar vacio")
         errores = true;
      } else if (campoPrice.value < 0) {
            alert("El campo precio debe ser mayor a cero")
            errores = true;
      }


      let campoDiscount = document.querySelector("input.form-control.discount");
      if (campoDiscount.value == "") {
         alert("El campo Descuento no puede estar vacio")
         errores = true;
      }

      let campoDate = document.querySelector("input.form-control.date");
      if (campoDate.value == "") {
         alert("Debe seleccionar una fecha")
         errores = true;
      } 
      var hoy = new Date();
      var day = hoy.getDate();
      var month = hoy.getMonth() + 1;
      var year = hoy.getFullYear();

      var fecha = year + '-' + "0" + month + '-' + day;

      if (campoDate.value > fecha) {
         alert("La fecha debe ser igual o menor a " + fecha)
         errores = true;
      }

      let campoDescription = document.querySelector("textarea.form-control.description");
      if (campoDescription.value == "") {
         alert("La descripcion debe completarse")
         errores = true;
      }
      if (errores==true) {
         e.preventDefault();

      }


   })



})