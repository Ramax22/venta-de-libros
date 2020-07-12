window.addEventListener("load", function() {
    // Obtengo el formulario
    let form = document.querySelector("form.registro");

    // Agrego un evento que se ejecutará cuando esté enviando el formulario
    form.addEventListener("submit", (e) => {
        // Declaro una flag que indica si hay errores
        let errors = false; 

        // Valido el nombre
        let name = document.querySelector("input.name");

        if (name.value == "") {
            alert("El campo de 'Nombre' tiene que estar completo.");
            errors = true;
        }

        // Valido el apellido
        let last = document.querySelector("input.last");

        if (last.value == "") {
            alert("El campo de 'Apellido' tiene que estar completo.");
            errors = true;
        }

        // Valido el mail
        let mail = document.querySelector("input.mail");

        if (mail.value == "") {
            alert("El campo de 'Email' tiene que estar completo.");
            errors = true;
        } else if (!mail.value.includes("@")) {
            alert("El campo de 'Email' tiene que ser en formado de mail 'ejemplo@mail.com'.");
            errors = true;
        }

        // Valido la contraseña
        let pass = document.querySelector("input.pass");

        if (pass.value == "") {
            alert("El campo de 'Contraseña' tiene que estar completo.");
            errors = true;
        } else if (pass.value.length < 6) {
            alert("El campo de 'Contraseña' tiene que tener mínimo 6 caracteres.");
            errors = true;
        }

        // Valido que las contraseñas sean las mismas
        let passRepeat = document.querySelector("input.repeat-pass");

        if (passRepeat.value != pass.value) {
            alert("Las contraseñas deben coincidir.");
            errors = true;
        }

        // Reviso si hay errores
        if (errors) {
            // Cancelo el envio de datos para trabajar comodo
            e.preventDefault();
        }
    });
});