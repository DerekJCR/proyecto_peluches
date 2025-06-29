//***HERNÁNDEZ TORRES CARLOS ADRIÁN**4CV1**17/06/2024***
function inicio() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'assets/inicio.html';
}
function about() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'assets/about.html';
}
function user() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'assets/user.php';
}
function productos() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'assets/productos.html';
}
function carrito() {
    var iframe = document.querySelector("iframe[name='info']");
    iframe.src = 'assets/carrito.html';
}
function index() {
    window.location.href = '/';
}
function registro() {
    window.location.href = 'assets/registro.html';
}
function registro2() {
    window.location.href = 'registro.html';
}
function login() {
    window.location.href = 'assets/login.html';
}
function login2() {
    window.location.href = 'login.html';
}
function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        window.location.href = 'assets/logout.php';
    }
}
function logout1() {
    window.top.location.href = 'assets/logout.php';
}
//***Realizado por HTCA***