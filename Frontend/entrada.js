// Declarar pads
let vigilantePad2, usuarioPad2;

function initPads2() {
    vigilantePad2 = new SignaturePad(document.getElementById("vigilanteCanvas2"));
    usuarioPad2 = new SignaturePad(document.getElementById("usuarioCanvas2"));
}

function clearPad2(pad) {
    pad.clear();
}

// Eventos
document.addEventListener("DOMContentLoaded", initPads2);

document.querySelectorAll(".btn-clear").forEach((btn) => {
    btn.addEventListener("click", () => {
        const padName = btn.getAttribute("data-pad");
        const pad = padName === "vigilantePad2" ? vigilantePad2 : usuarioPad2;
        clearPad2(pad);
    });
});

// Obtener los datos de las firmas en formato base64
function getSignatureData2(pad) {
    return pad.toDataURL();
}

function submitForm2(e) {
    e.preventDefault();

    const vigilanteSignature2 = getSignatureData2(vigilantePad2);
    const usuarioSignature2 = getSignatureData2(usuarioPad2);

    const data = {
        fechaLlegada: document.getElementById("fechaLlegada").value,
        departamento: document.getElementById("departamento").value,
        vehiculo: document.getElementById("vehiculo").value,
        horaLlegada: document.getElementById("horaLlegada").value,
        kmLlegada: document.getElementById("kmLlegada").value,
        nombreVigilante2: document.getElementById("nombreVigilante2").value,
        firmaVigilante2: vigilanteSignature2,
        firmaUsuario2: usuarioSignature2,
        destinoLocal: document.getElementById("destinoLocal").checked,
        destinoForaneo: document.getElementById("destinoForaneo").checked,
        accesorios: Array.from(document.querySelectorAll('input[name="accesorios"]:checked')).map(checkbox => checkbox.value),
        observaciones: document.getElementById("observaciones").value
    };

    console.log(data);

    //Enviar datos a la API o realizar otras acciones aquí
    //Por ejemplo:
    fetch("http://localhost:3010/arrival", {
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
