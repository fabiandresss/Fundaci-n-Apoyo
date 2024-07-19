$(document).ready(function () {
    fetch('/api/mandates')
        .then(response => response.json())
        .then(data => {
            const tableBody = $('#mandates-table-body');
            
            if (data.length === 0) {
                tableBody.append('<tr><td colspan="9" style="text-align: center;">Usted no tiene mandatos</td></tr>');
            } else {
                data.forEach(mandate => {
                    const row = `<tr>
                        <td>${mandate.name}</td>
                        <td>${mandate.lastname}</td>
                        <td>${mandate.rut}</td>
                        <td>${mandate.phone}</td>
                        <td>${mandate.day}</td>
                        <td>${mandate.amount}</td>
                        <td>${mandate.cardDetails.replace(/\d{12}(\d{4})/, "**** **** **** $1")}</td>
                        <td>${mandate.cvv.replace(/\d/, "*")}</td>
                        <td>${mandate.expiryDate}</td>
                    </tr>`;
                    tableBody.append(row);
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener los mandatos:', error);
        });
});
