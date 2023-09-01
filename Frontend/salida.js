// Declarar pads
let vigilantePad, usuarioPad;

function initPads() {
    vigilantePad = new SignaturePad(document.getElementById("vigilanteCanvas"));
    usuarioPad = new SignaturePad(document.getElementById("usuarioCanvas"));
}

function clearPad(pad) {
    pad.clear();
}

// Eventos
document.addEventListener("DOMContentLoaded", initPads);

document.querySelectorAll(".btn-clear").forEach((btn) => {
    btn.addEventListener("click", () => {
        const padName = btn.getAttribute("data-pad");
        const pad = padName === "vigilantePad" ? vigilantePad : usuarioPad;
        clearPad(pad);
    });
});

// Obtener los datos de las firmas en formato base64
function getSignatureData(pad) {
    return pad.toDataURL();
}

function submitForm(e) {
    e.preventDefault();

    const vigilanteSignature = getSignatureData(vigilantePad);
    const usuarioSignature = getSignatureData(usuarioPad);

    const data = {
        folio: document.getElementById("folio").value,
        fechaSalida: document.getElementById("fechaSalida").value,
        nombre: document.getElementById("nombre").value,
        placas: document.getElementById("placas").value,
        horaSalida: document.getElementById("horaSalida").value,
        kmSalida: document.getElementById("kmSalida").value,
        nombreVigilante: document.getElementById("nombreVigilante").value,
        firmaVigilante: vigilanteSignature,
        firmaUsuario: usuarioSignature,
    };

    console.log(data);

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
