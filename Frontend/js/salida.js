
function submitForm(e) {
    e.preventDefault();

    const vigilanteSignature = createDataURL(vigilantePad,"svg");
    const usuarioSignature = createDataURL(usuarioPad,"svg");


    const data = {
        folio: document.getElementById("folio").value,
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
