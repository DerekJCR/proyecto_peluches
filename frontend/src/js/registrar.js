//***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***
function validarFormulario() {
    var username = document.getElementById("usuario").value;
    var email = document.getElementById("correo").value;
    var password = document.getElementById("contrasena").value;
    if (username.length < 5) {
        alert("Introduzca un nombre de usuario de al menos 6 caracteres.");
        return false;
    } 
    if (!validarEmail(email)) {
        alert("Introduzca una dirección de correo electrónico válida");
        return false;
    }
    if (password.length < 7) {
        alert("Introduzca una contraseña de al menos 8 caracteres.");
        return false;
    }
    return true;
}
function validarUser() {
    var username = document.getElementById("new_usuario").value;
    if (username.length < 5) {
        alert("Introduzca un nombre de usuario de al menos 6 caracteres.");
        return false;
    }
    else{
        return confirm('¿Estás seguro que deseas cambiar tu Nombre de Usuario?');
    }
    
}
function validarContrasena() {
    var password = document.getElementById("new_password").value;
    if (password.length < 7) {
        alert("Introduzca una contraseña de al menos 8 caracteres.");
        return false;
    }
    return true;
}
function validarCorreo() {
    var email = document.getElementById("new_correo").value;
    if (!validarEmail(email)) {
        alert("Introduzca una dirección de correo electrónico válida");
        return false;
    }
    return true;
}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//***Realizado por HTCA***