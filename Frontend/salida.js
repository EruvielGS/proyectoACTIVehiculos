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

document.querySelectorAll(".btn-clear").forEach((btn, index) => {
  btn.addEventListener("click", () =>
    clearPad(index === 0 ? vigilantePad : usuarioPad)
  );
});

// Obtener los datos de las firmas en formato base64
function getSignatureData(pad) {
  return pad.toDataURL(); // Obtiene la firma en base64
}
function submitForm(e) {
  e.preventDefault(); // Evitar el envío del formulario por defecto

  const vigilanteSignature = getSignatureData(vigilantePad);
  const usuarioSignature = getSignatureData(usuarioPad);

  // Aquí puedes usar las firmas en formato base64 como desees, por ejemplo, enviarlas al servidor
  return {
    vigilanteSignature,
    usuarioSignature,
  };

  // Resto de la lógica para enviar los datos del formulario si es necesario
}


const salida = document.getElementById("formularioSalida");

salida.addEventListener("submit", function (e) {
  e.preventDefault(); // previene que se recargue la página
  const firmas = submitForm(e);
  // obtener datos del formulario
  const data = {
    folio: document.getElementById("folio").value,
    fechaSalida: document.getElementById("fechaSalida").value,
    nombre: document.getElementById("nombre").value,
    placas: document.getElementById("placas").value,
    horaSalida: document.getElementById("horaSalida").value,
    kmSalida: document.getElementById("kmSalida").value,
    nombreVigilante: document.getElementById("nombreVigilante").value,
    firmaVigilante: firmas.vigilanteSignature,
    firmaUsuario: firmas.usuarioSignature,
  };

  console.log(data);

  // enviar datos a API
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
});


