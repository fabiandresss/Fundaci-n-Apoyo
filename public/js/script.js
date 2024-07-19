$(document).ready(function() {

     // Obtener los datos del sessionStorage
     const mandate = JSON.parse(sessionStorage.getItem('mandate'));

     // Mostrar los datos en el contrato
     $('#contractName').text(mandate.name);
     $('#contractLastName').text(mandate.lastname);
     $('#contractRut').text(mandate.rut);
     $('#contractDay').text(mandate.day);
     $('#contractAmount').text(mandate.amount);
    // Obtener el canvas y el contexto 2D
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');

    // Variables para seguir el estado del dibujo
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Evento para comenzar a dibujar al presionar el mouse
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    // Evento para dibujar mientras se mueve el mouse
    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    });

    // Evento para dejar de dibujar al soltar el mouse
    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    // Evento para dejar de dibujar al salir del área del canvas
    canvas.addEventListener('mouseout', function() {
        isDrawing = false;
    });

    // Evento para borrar el canvas al hacer clic en el botón
    document.getElementById('clearSignature').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});

// Obtener el modal y el botón de cerrar
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];

// Mostrar el modal al hacer clic en el botón Aceptar contrato
document.getElementById('submitContractButton').addEventListener('click', function() {
    modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeButton.onclick = function() {
    modal.style.display = 'none';
};

// Cerrar el modal al hacer clic fuera del área del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
