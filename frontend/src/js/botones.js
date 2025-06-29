//***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***
function inicio() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'inicio.html';
}
function about() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'about.html';
}
function user() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'user.php';
}
function index() {
    window.location.href = 'index.php';
}
function registro() {
    window.location.href = 'registro.php';
}
function login() {
    window.location.href = 'login.php';
}
function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        window.location.href = 'logout.php';
    }
}
function logout1() {
    window.top.location.href = 'logout.php';
}
//***Realizado por HTCA***