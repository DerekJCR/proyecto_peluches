document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.add');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = boton.parentElement;
            const nombre = producto.querySelector('h4').textContent;
            const precio = producto.querySelector('h4 + h4').textContent.replace('$', '').trim();
            const imagen = producto.querySelector('img').src;  // Obtener URL de la imagen

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push({ nombre, precio, imagen });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log(localStorage.getItem('carrito'));
            alert(`${nombre} añadido al carrito`);
        });
    });
});
