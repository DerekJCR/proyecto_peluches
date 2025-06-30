window.onload = function() {
    const token = localStorage.getItem('token');
    console.log("Token almacenado:", token); // Depuración para verificar que el token se recuperó correctamente

    if (token) {
        // Si el token existe, significa que el usuario está autenticado
        const userName = localStorage.getItem('nombre');  // Aquí puedes extraer el nombre del usuario del token si lo guardaste
        console.log("Usuario autenticado: " + userName);  // Depuración del usuario autenticado
        
        // Asegurarnos de que los elementos con los ids correctos existan
        const authButtons = document.getElementById("auth-buttons");
        const userButtons = document.getElementById("user-buttons");
        const shop1Buttons = document.getElementById("shop1-buttons");
        const shop2Buttons = document.getElementById("shop2-buttons");
        const shop3Buttons = document.getElementById("shop3-buttons");
        const shop4Buttons = document.getElementById("shop4-buttons");
        const userNameButton = document.getElementById("user-name-button");

        // Verificación de existencia de los elementos antes de cambiar su visibilidad
        if (authButtons && userButtons && userNameButton && shop1Buttons && shop2Buttons && shop3Buttons && shop4Buttons) {
            authButtons.style.display = 'none';
            shop1Buttons.style.display = 'none';
            shop2Buttons.style.display = 'none';  // Ocultar los botones de login y registro
            userButtons.style.display = 'block';
            shop3Buttons.style.display = 'block';
            shop4Buttons.style.display = 'block';  // Mostrar los botones de usuario
            userNameButton.textContent = `${userName}`;  // Mostrar el nombre del usuario
        } else {
            console.error("No se encuentran los elementos en el DOM para cambiar la visibilidad.");
        }

    } else {
        // Si no hay token, significa que el usuario no está autenticado
        console.log("Usuario no autenticado");

        // Asegurarnos de que los elementos con los ids correctos existan
        const authButtons = document.getElementById("auth-buttons");
        const userButtons = document.getElementById("user-buttons");
        const shop1Buttons = document.getElementById("shop1-buttons");
        const shop2Buttons = document.getElementById("shop2-buttons");
        const shop3Buttons = document.getElementById("shop3-buttons");
        const shop4Buttons = document.getElementById("shop4-buttons");

        // Verificación de existencia de los elementos antes de cambiar su visibilidad
        if (authButtons && userButtons) {
            authButtons.style.display = 'block';
            shop1Buttons.style.display = 'block';
            shop2Buttons.style.display = 'block';  // Mostrar los botones de login y registro
            userButtons.style.display = 'none';
            shop3Buttons.style.display = 'none';
            shop4Buttons.style.display = 'none';  // Ocultar los botones de usuario
        } else {
            console.error("No se encuentran los elementos en el DOM para cambiar la visibilidad.");
        }
    }
};

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');  // Eliminar el token de localStorage
    console.log("Token eliminado:", localStorage.getItem('token'));  // Verificar que el token se eliminó

    // Asegurarnos de que los elementos con los ids correctos existan
    const authButtons = document.getElementById("auth-buttons");
    const userButtons = document.getElementById("user-buttons");

    // Verificación de existencia de los elementos antes de cambiar su visibilidad
    if (authButtons && userButtons) {
        authButtons.style.display = 'block';  // Mostrar los botones de login y registro
        userButtons.style.display = 'none';  // Ocultar los botones de usuario
    }

    window.location.href = "/";  // Redirigir al login o a la página principal
}