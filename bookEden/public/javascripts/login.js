window.onload = function(){

// VALIDACIONES "EN VIVO"

    /* VALIDACIÓN DE CORREO */
    var email = document.querySelector('.email.form-control');
    console.log(email);

    email.addEventListener('blur', function(){
        if(email.value == ""){
            email.classList.add('is-invalid')
            document.querySelector('.email.invalid-feedback').innerHTML = 'Por favor, ingresa tu email'
        }
    })

    email.addEventListener('blur', function(){
        if(email.value != ""){
            email.classList.remove('is-invalid')
            document.querySelector('.email.invalid-feedback').innerHTML = ''
            email.classList.add('is-valid')
            document.querySelector('.email.valid-feedback').innerHTML = 'Perfecto :)'
        }
    })
    

    /* VALIDACIÓN DE CONTRASEÑA */

    var password = document.querySelector('.password.form-control');
    
    password.addEventListener('blur', function(){
        if(password.value == ""){
            password.classList.add('is-invalid');
            document.querySelector('.password.invalid-feedback').innerHTML = 'Por favor, ingresa tu contraseña'
        } else if(password.value.length < 6){
            password.classList.add('is-invalid');
            document.querySelector('.password.invalid-feedback').innerHTML = 'La contraseña debe tener mínimo 6 caracteres'
        }

    })

    password.addEventListener('blur', function(){
        if(password.value.length > 5){
            password.classList.remove('is-invalid');
            document.querySelector('.password.invalid-feedback').innerHTML = ''
            password.classList.add('is-valid')
            document.querySelector('.password.valid-feedback').innerHTML = 'Perfecto :)'
        }

    })
    
// VALIDACIONES AL HACER SUBMIT

    var formulario = document.querySelector('form.login')

    formulario.addEventListener('submit', function(e){
        

        let errores = [];

        if(email.value == ""){
            errores.push('El campo email debe estar lleno')
        }

        if(password.value == ""){
            errores.push('El campo de contraseña debe estar lleno') 
        } else if(password.value.length < 6){
            errores.push('La contraseña debe tener mínimo 6 caracteres')
        }

        if (errores.length > 0){
        //si tenemos errores, evitamos que se envíe el formulario
            e.preventDefault();

            let ulErrores = document.querySelector('div.errores ul')
            //recorremos el array de errores
            for (let i = 0; i < errores.length; i++) {
                
                ulErrores.innerHTML += '<li>'+ errores[i] + '</li>'
                
            }
        }
    })

}
