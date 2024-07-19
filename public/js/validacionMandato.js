// Validador de formulario de registro
$(document).ready(function () {

    // Método de validación para RUT chileno
    $.validator.addMethod("rutChileno", function (value, element) {
        value = value.replace(/\./g, ""); // Remover puntos
        var rutPattern = /^\d{7,8}-[\dK]$/; // Expresión regular para validar RUT
        return rutPattern.test(value) && $.validator.methods.validarRut.call(this, value, element);
    }, "El RUT no es válido (escriba sin puntos y con guión)");

    // Método de validación para que un campo sólo acepte letras y espacios en blanco
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
    }, "Sólo se permiten letras y espacios en blanco.");

    $.validator.addMethod("soloNumeros", function (value, element) {
        return this.optional(element) || /^[0-9]+$/.test(value);
    }, "Solo se permiten números.");

    // Metodo de regla de validación para fechas no anteriores a agosto 2024
    $.validator.addMethod("minFecha", function (value, element) {
        const minDate = new Date(2024, 7, 1); // Agosto es el mes 7 en JavaScript (0-indexed)
        const inputDate = new Date(value);
        return this.optional(element) || inputDate >= minDate;
    }, "La fecha de expiración no puede ser anterior a agosto de 2024.");

    // Metodo para que amount no sea inferior a 10000
    $.validator.addMethod("minMonto", function (value, element) {
        return this.optional(element) || value >= 10000;
    }, "El monto no puede ser inferior a 10,000.");

    $.validator.addMethod("validarRut", function (value, element) {
        value = value.replace(/\./g, "").replace(/-/g, ""); // Remover puntos y guiones
        var rut = value.slice(0, -1);
        var dv = value.slice(-1).toUpperCase(); // Convertir dígito verificador a mayúscula
        var factor = 2;
        var sum = 0;

        // Calcular suma ponderada de los dígitos del RUT
        for (var i = rut.length - 1; i >= 0; i--) {
            sum += parseInt(rut.charAt(i)) * factor;
            factor = factor === 7 ? 2 : factor + 1;
        }

        // Calcular dígito verificador esperado
        var dvCalculado = 11 - (sum % 11);
        dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

        // Verificar que el dígito verificador coincida
        return dv === dvCalculado;
    }, "El RUT no es válido (escriba sin puntos y con guión)");


    // El siguiente Javascript obliga a que la caja de texto del RUT siempre escriba la letra "K" en mayúscula
    document.getElementById('rut').addEventListener('keyup', function (e) {
        e.target.value = e.target.value.toUpperCase();
    });

    // Validar formulario con JQuery
    $("#mandateForm").validate({
        rules: {
            name: {
                required: true,
                soloLetras: true
            },
            lastname: {
                required: true,
                soloLetras: true
            },
            rut: {
                required: true,
                rutChileno: true,
                validarRut: true,
            },
            phone: {
                required: true,
                soloNumeros: true,
                minlength: 9,
                maxlength: 9
            },
            day: {
                required: true,
                minlength: 1,
                maxlength: 2,
                soloNumeros: true
            },
            amount: {
                required: true,
                soloNumeros: true,
                minMonto: true
            },
            cardDetails: {
                required: true,
                soloNumeros: true,
                minlength: 16,
                maxlength: 16,
            },
            cvv: {
                required: true,
                soloNumeros: true,
                minlength: 3,
                maxlength: 3
            },
            expiryDate: {
                required: true,
                minFecha: true
            }
        },
        messages: {
            name: {
                required: "El nombre es un campo requerido",
                soloLetras: "El nombre solo puede contener letras y espacios en blanco"
            },
            lastname: {
                required: "El apellido es un campo requerido",
                soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
            },
            rut: {
                required: "El RUT es un campo requerido",
                rutChileno: "El RUT no es válido (escriba sin puntos y con guión)",
                validarRut: "El RUT no es válido (escriba sin puntos y con guión)"
            },
            phone: {
                required: "El teléfono es un campo requerido",
                soloNumeros: "El campo teléfono sólo puede contener números",
                minlength: "El número debe tener 9 digitos Ej: 989765434",
                maxlength: "El número debe tener 9 digitos Ej: 989765434"
            },
            day: {
                required: "El día de cobro es un campo requerido",
                soloNumeros: "El campo día de cobro sólo puede contener números",
                minlength: "El día de cobro no puede tener menos de 1 dígito",
                maxlength: "El día de cobro no puede tener mas de 3 dígitos"
            },
            amount: {
                required: "El monto es un campo requerido",
                soloNumeros: "El campo monto sólo puede contener números",
                minMonto: "El monto no puede ser inferior a 10000"
            },
            cardDetails: {
                required: "El número de su tarjeta es un campo requerido",
                soloNumeros: "Número de tarjeta invalido",
                minlength: "Número de tarjeta invalido",
                maxlength: "Número de tarjeta invalido",
            },
            cvv: {
                required: "El CVV es un campo requerido",
                soloNumeros: "El cvv sólo puede contener números",
                minlength: "CVV inavlido",
                maxlength: "CVV invalido"
            },
            expiryDate: {
                required: "La fecha de expiración es un campo requerido",
                minFecha: "La fecha de expiración no puede ser menor a la fecha actual"
            }
        },

        submitHandler: function (form) {
            
            const mandate = {
                name: $('#name').val(),
                lastname: $('#lastname').val(),
                rut: $('#rut').val(),
                phone: $('#phone').val(),
                day: $('#day').val(),
                amount: $('#amount').val(),
                cardDetails: $('#cardDetails').val(),
                cvv: $('#cvv').val(),
                expiryDate: $('#expiryDate').val()
            };

             // Almacenar los datos en sessionStorage
             sessionStorage.setItem('mandate', JSON.stringify(mandate));

             // Redirigir a contrato.html
             window.location.href = '/contrato.html';
             
            fetch('/api/mandates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mandate)
            })
            .then(response => response.json())
            .then(data => {
                alert('Mandato registrado con éxito!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            // Previene el envío normal del formulario
            return false;
        }
    });

});


