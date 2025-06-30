function validarFormulario(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var contraseña = document.getElementById("contraseña").value;
    var telefono = document.getElementById("telefono").value;

    // Validación de los campos
    if (nombre.length < 6) {
        alert("Introduzca un nombre de usuario de al menos 6 caracteres.");
        return false;
    } 
    if (!validarEmail(correo)) {
        alert("Introduzca una dirección de correo electrónico válida");
        return false;
    }
    if (contraseña.length < 8) {
        alert("Introduzca una contraseña de al menos 8 caracteres.");
        return false;
    }
    if (telefono.length < 10 ) {
        alert("Introduzca un teléfono válido.");
        return false;
    }

    // Crear el objeto con los datos para enviar
    const datos = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña,
        telefono: telefono
    };
    console.log("Datos a enviar:", datos);

    // Enviar los datos al backend de Django usando fetch
    fetch('https://backendrender-7dgs.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("¡Registro exitoso!");
            window.location.href = '/';
        }
    })
    .catch(error => {
        console.error('Error al registrar:', error);
        alert("Hubo un error al registrar el usuario. Intenta nuevamente.");
    });

    return false; // Evitar que el formulario se envíe de manera tradicional
}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

