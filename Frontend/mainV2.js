// Declarar pads
let vigilantePad, usuarioPad;

function initPads() {
  vigilantePad = new SignaturePad(document.getElementById('vigilanteCanvas'));
  usuarioPad = new SignaturePad(document.getElementById('usuarioCanvas'));
}

function clearPad(pad) {
  pad.clear();
}

// Eventos
document.addEventListener('DOMContentLoaded', initPads);

document.querySelectorAll('.btn-clear').forEach((btn, index) => {
  btn.addEventListener('click', () => clearPad(index === 0 ? vigilantePad : usuarioPad));
});

// Obtener los datos de las firmas en formato base64
function getSignatureData(pad) {
  return pad.toDataURL(); // Obtiene la firma en base64
}

// Evento para enviar el formulario
// function submitForm(e) {
//   e.preventDefault(); // Evitar el envío del formulario por defecto

//   const vigilanteSignature = getSignatureData(vigilantePad);
//   const usuarioSignature = getSignatureData(usuarioPad);

//   return {
//     vigilanteSignature,
//     usuarioSignature
//   }
//   // Aquí puedes usar las firmas en formato base64 como desees, por ejemplo, enviarlas al servidor
//   console.log('Firma del vigilante:', vigilanteSignature);
//   console.log('Firma del usuario:', usuarioSignature);

//   // Resto de la lógica para enviar los datos del formulario si es necesario
// }
