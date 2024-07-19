// Este código sirve para que los números de la tarjeta se separen de 4 en 4 
document.getElementById('cardDetails').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\s+/g, ''); // Elimina todos los espacios
    if (value.length > 16) {
        value = value.slice(0, 16); // Limita la longitud a 16 caracteres
    }
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim(); // Agrega un espacio cada 4 caracteres
    e.target.value = formattedValue;
});

// Este código sirve para que el campo 'cvv' no acepte mas de 3 carácteres y solo carácteres númericos
document.getElementById('cvv').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    if (value.length > 3) {
        value = value.slice(0, 3); // Limita la longitud a 3 caracteres
    }
    e.target.value = value;
});