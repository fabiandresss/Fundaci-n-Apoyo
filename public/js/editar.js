function buscarYEditar() {
    const rut = $('#rut').val();
    const day = $('#day').val();
    const amount = $('#amount').val();
    const cardDetails = $('#cardDetails').val();
    const cvv = $('#cvv').val();
    const expiryDate = $('#expiryDate').val();

    // Buscar mandato por RUT
    $.ajax({
        url: '/api/mandates/search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ rut: rut }),
        success: function(mandate) {
            // Si el mandato se encuentra, proceder a la actualización
            $.ajax({
                url: `/api/mandates/${rut}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    day: day,
                    amount: amount,
                    cardDetails: cardDetails,
                    cvv: cvv,
                    expiryDate: expiryDate
                }),
                success: function(updatedMandate) {
                    $('#mensajeError').text('Mandato actualizado correctamente.').removeClass('text-danger').addClass('text-success');
                },
                error: function() {
                    $('#mensajeError').text('Error al actualizar el mandato.').removeClass('text-success').addClass('text-danger');
                }
            });
        },
        error: function() {
            $('#mensajeError').text('Mandato no encontrado.').removeClass('text-success').addClass('text-danger');
        }
    });
}



