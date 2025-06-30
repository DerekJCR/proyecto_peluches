function validarFormulario(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Obtener los datos del formulario
    var nombre = document.getElementById("nombre").value;
    var contraseña = document.getElementById("contraseña").value;

    // Validar los campos
    if (nombre.length < 6) {
        alert("El nombre de usuario debe tener al menos 6 caracteres.");
        return false;
    }
    if (contraseña.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return false;
    }

    // Crear el objeto con los datos de inicio de sesión
    const datos = {
        nombre: nombre,
        contraseña: contraseña
    };

    // Enviar los datos al backend de Django usando fetch
    fetch('https://backendrender-7dgs.onrender.com/api/login/', {  // Ajusta la URL según la API en Django
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del backend:", data);
        if (data.token) { // Si el backend responde con un token, el login fue exitoso
            alert("¡Inicio de sesión exitoso!");
            // Aquí puedes redirigir a otra página, por ejemplo, al dashboard del usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('nombre', data.nombre);
            localStorage.setItem('correo', data.correo);
            localStorage.setItem('contraseña', data.contraseña);
            localStorage.setItem('telefono', data.telefono);
            console.log("Token guardado:", localStorage.getItem('token'));
            console.log("ID guardado:", localStorage.getItem('uid'));
            console.log("Nombre guardado:", localStorage.getItem('nombre'));
            console.log("Correo guardado:", localStorage.getItem('correo'));
            console.log("Contraseña guardado:", localStorage.getItem('contraseña'));
            console.log("Telefono guardado:", localStorage.getItem('telefono'));  // Verificar que el token se guardó
            window.location.href = "/";
        } else {
            alert("Credenciales incorrectas. Intenta nuevamente.");
        }
    })
    
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        alert("Hubo un error al intentar iniciar sesión.");
    });

    return false; // Evitar que el formulario se envíe de manera tradicional
}

