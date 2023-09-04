// Declarar pads
let vigilantePad, usuarioPad;

function initPads() {
  vigilantePad = new SignaturePad(document.getElementById("vigilanteCanvas"));
  usuarioPad = new SignaturePad(document.getElementById("usuarioCanvas"));
}

// Eventos
document.addEventListener("DOMContentLoaded", initPads);

function isPadEmpty(pad) {
  return pad.isEmpty();
}
function clearPad(pad) {
  pad.clear();
}

//Obtener los datos de las firmas en formato base64 IMG
function crearPNGConfirma(pad) {
  if (isPadEmpty(pad)) {
    return null;
  }
  const dataURL = pad.toDataURL();
  return dataURL;
}

function crearSVGConFirma(pad) {
  if (isPadEmpty(pad)) {
    alert("Pon la firma");
    return
  }

  const dataURL = pad.toDataURL("image/svg+xml");
  console.log(dataURL)
  return dataURL;
}

document.querySelectorAll(".btn-clear").forEach((btn) => {
  btn.addEventListener("click", () => {
    const padName = btn.getAttribute("data-pad");
    const pad = padName === "vigilantePad" ? vigilantePad : usuarioPad;
    clearPad(pad);
  });
});

