// Obtener los datos de las firmas en formato base64
function getSignatureData2(pad) {
    return pad.toDataURL();
}

function submitForm2(e) {
    e.preventDefault();

    const vigilanteSignature = getSignatureData(vigilantePad);
    const usuarioSignature = getSignatureData(usuarioPad);

    const data = {
        fechaLlegada: document.getElementById("fechaLlegada").value,
        departamento: document.getElementById("departamento").value,
        vehiculo: document.getElementById("vehiculo").value,
        horaLlegada: document.getElementById("horaLlegada").value,
        kmLlegada: document.getElementById("kmLlegada").value,
        nombreVigilante: document.getElementById("nombreVigilante").value,
        firmaVigilante: vigilanteSignature,
        firmaUsuario: usuarioSignature,
        destinoLocal: document.getElementById("destinoLocal").checked,
        destinoForaneo: document.getElementById("destinoForaneo").checked,
        accesorios: Array.from(document.querySelectorAll('input[name="accesorios"]:checked')).map(checkbox => checkbox.value),
        observaciones: document.getElementById("observaciones").value
    };

    console.log(data);

    //Enviar datos a la API o realizar otras acciones aquí
    //Por ejemplo:
    console.log("Coordenadas a enviar:", damageCoordinatesInput.value);

    fetch("http://localhost:3010/entry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
}

const llegada = document.getElementById("formulario");

llegada.addEventListener("submit", submitForm2);
