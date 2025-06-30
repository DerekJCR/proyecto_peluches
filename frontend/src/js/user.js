const SUPABASE_URL = 'https://qvqpeccncxkkeaxiaphv.supabase.co';
const SUPABASE_API_KEY = 'a';

// Recuperar los datos almacenados en localStorage
window.onload = function() {
    const userName = localStorage.getItem('nombre');
    const email = localStorage.getItem('correo');
    const password = localStorage.getItem('contraseña');
    const phone = localStorage.getItem('telefono');
    const uid = localStorage.getItem('uid');  // Guardamos el user_id al hacer login

    // Asignar los valores a los elementos del DOM
    if (userName) {
        document.getElementById("user-name").textContent = userName;
    }

    if (email) {
        document.getElementById("user-email").textContent = email;
    }

    if (password) {
        document.getElementById("user-password").textContent = password;
    }

    if (phone) {
        document.getElementById("user-phone").textContent = phone;
    }
};

// Actualizar el nombre de un usuario
function actualizarNombre() {
    const nuevoNombre = document.getElementById("new_usuario").value;
    const userId = localStorage.getItem('uid');  // Obtener el user_id de localStorage

    if (!nuevoNombre) {
        alert("Por favor ingresa un nuevo nombre.");
        return;
    }

    if (!userId) {
        alert("No se encontró el ID de usuario. Por favor inicia sesión.");
        return;
    }

    // Realizar la solicitud para actualizar el nombre usando la API Key secreta
    fetch(`${SUPABASE_URL}/rest/v1/tienda_cliente?id=eq.${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_API_KEY,  // Usar la API Key secreta aquí
            'Prefer': 'return=representation',  // Retornar los registros modificados
        },
        body: JSON.stringify({
            nombre: nuevoNombre,  // Solo actualizar el nombre
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error al actualizar los datos: " + data.error);
        } else {
            // Actualizar el nombre en localStorage
            localStorage.setItem('nombre', nuevoNombre);

            alert("¡Nombre actualizado exitosamente!");
            window.location.reload();  // Recargar la página para reflejar los cambios
        }
    })
    .catch(error => {
        console.error("Error al actualizar el nombre:", error);
        alert("Hubo un error al actualizar el nombre.");
    });
}

// Función para actualizar el correo
function actualizarCorreo(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const nuevoCorreo = document.getElementById("new_correo").value;
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    if (!nuevoCorreo) {
        alert("Por favor ingresa un nuevo correo.");
        return;
    }

    if (!token) {
        alert("No se encontró el token. Por favor inicia sesión.");
        return;
    }

    // Realizar la solicitud para actualizar el correo en Supabase usando el token
    fetch(`${SUPABASE_URL}/rest/v1/tienda_cliente?id=eq.${localStorage.getItem('uid')}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluir el token de autenticación en los encabezados
            'Prefer': 'return=representation',  // Retornar los registros modificados
        },
        body: JSON.stringify({
            correo: nuevoCorreo, // Solo se actualiza el correo
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error al actualizar el correo: " + data.error);
        } else {
            // Actualizar el correo en localStorage
            localStorage.setItem('correo', nuevoCorreo);

            alert("¡Correo actualizado exitosamente!");
            window.location.reload(); // Recargar la página para reflejar los cambios
        }
    })
    .catch(error => {
        console.error("Error al actualizar el correo:", error);
        alert("Hubo un error al actualizar el correo.");
    });
}

// Función para actualizar la contraseña
function actualizarContrasena(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const nuevaContrasena = document.getElementById("new_password").value;
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    if (!nuevaContrasena) {
        alert("Por favor ingresa una nueva contraseña.");
        return;
    }

    if (!token) {
        alert("No se encontró el token. Por favor inicia sesión.");
        return;
    }

    // Realizar la solicitud para actualizar la contraseña en Supabase usando el token
    fetch(`${SUPABASE_URL}/rest/v1/tienda_cliente?id=eq.${localStorage.getItem('uid')}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluir el token de autenticación en los encabezados
            'Prefer': 'return=representation',  // Retornar los registros modificados
        },
        body: JSON.stringify({
            contraseña: nuevaContrasena, // Solo se actualiza la contraseña
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error al actualizar la contraseña: " + data.error);
        } else {
            // Actualizar la contraseña en localStorage
            localStorage.setItem('contraseña', nuevaContrasena);

            alert("¡Contraseña actualizada exitosamente!");
            window.location.reload(); // Recargar la página para reflejar los cambios
        }
    })
    .catch(error => {
        console.error("Error al actualizar la contraseña:", error);
        alert("Hubo un error al actualizar la contraseña.");
    });
}

// Función para actualizar el teléfono
function actualizarTelefono(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const nuevoTelefono = document.getElementById("new_telefono").value;
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    if (!nuevoTelefono) {
        alert("Por favor ingresa un nuevo teléfono.");
        return;
    }

    if (!token) {
        alert("No se encontró el token. Por favor inicia sesión.");
        return;
    }

    // Realizar la solicitud para actualizar el teléfono en Supabase usando el token
    fetch(`${SUPABASE_URL}/rest/v1/tienda_cliente?id=eq.${localStorage.getItem('uid')}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluir el token de autenticación en los encabezados
            'Prefer': 'return=representation',  // Retornar los registros modificados
        },
        body: JSON.stringify({
            telefono: nuevoTelefono, // Solo se actualiza el teléfono
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error al actualizar el teléfono: " + data.error);
        } else {
            // Actualizar el teléfono en localStorage
            localStorage.setItem('telefono', nuevoTelefono);

            alert("¡Teléfono actualizado exitosamente!");
            window.location.reload(); // Recargar la página para reflejar los cambios
        }
    })
    .catch(error => {
        console.error("Error al actualizar el teléfono:", error);
        alert("Hubo un error al actualizar el teléfono.");
    });
}

// Función para eliminar la cuenta
function eliminarCuenta(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta?');
    if (confirmacion) {
        // Eliminar la cuenta en Supabase utilizando el token
        fetch(`${SUPABASE_URL}/rest/v1/tienda_cliente?id=eq.${localStorage.getItem('uid')}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Incluir el token de autenticación en los encabezados
                'Prefer': 'return=representation',  // Retornar los registros eliminados
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Error al eliminar la cuenta: " + data.error);
            } else {
                alert("Cuenta eliminada exitosamente.");
                localStorage.removeItem('token');
                localStorage.removeItem('nombre');
                localStorage.removeItem('correo');
                localStorage.removeItem('contraseña');
                localStorage.removeItem('telefono');
                window.location.href = "/";  // Redirigir al login o página principal
            }
        })
        .catch(error => {
            console.error("Error al eliminar la cuenta:", error);
            alert("Hubo un error al eliminar la cuenta.");
        });
    }
}
