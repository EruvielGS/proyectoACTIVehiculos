
function submitForm(e) {
    e.preventDefault();

    const vigilanteSignature = crearSVGConFirma(vigilantePad);
    const usuarioSignature = crearSVGConFirma(usuarioPad);


    const data = {
        folio: document.getElementById("folio").value,
        // fechaSalida: document.getElementById("fechaSalida").value,
        // nombre: document.getElementById("nombre").value,
        // placas: document.getElementById("placas").value,
        // horaSalida: document.getElementById("horaSalida").value,
        // kmSalida: document.getElementById("kmSalida").value,
        // nombreVigilante: document.getElementById("nombreVigilante").value,
        firmaVigilante: vigilanteSignature,
        firmaUsuario: usuarioSignature,
    };

    //console.log(data);

    fetch("http://localhost:3010/exit", {
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

const salida = document.getElementById("formulario");

salida.addEventListener("submit", submitForm);
