document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-container');
    const mensaje = document.getElementById('mensaje-vacio');

    if (carrito.length === 0) {
        mensaje.style.display = 'block';
    } else {
        mensaje.style.display = 'none';
        carrito.forEach(item => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            const img = document.createElement('img');
            img.src = item.imagen;
            img.width = 50;
            img.height = 50;
            div.appendChild(img);
            const p = document.createElement('p');
            p.textContent = `${item.nombre} - $${item.precio}`;
            div.appendChild(p);
            contenedor.appendChild(div);
        });
    }

    document.querySelector('button[name="buy"]').addEventListener('click', generarPDF);
    document.querySelector('button[name="delete"]').addEventListener('click', () => {
        localStorage.removeItem('carrito');
        location.reload();
    });
});

function generarPDF() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Peluchelandia - Recibo de Compra", doc.internal.pageSize.width / 2, 20, { align: 'center' });

    // Crear una tabla con imágenes (sin las URLs)
    const col = ["Producto", "Precio"];
    const rows = carrito.map(item => [item.nombre, `$${item.precio}`]);

    doc.autoTable({
        head: [col],
        body: rows,
        startY: 30,
        theme: 'grid',
        
    });

    // Calcular el total
    const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0);

    // Agregar el total
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    // Guardar el PDF
    doc.save("Recibo.pdf");
}