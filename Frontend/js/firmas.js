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

//Obtener los datos de las firmas en formato base64 IMG
function crearPNGConfirma(pad) {
  if (isPadEmpty(pad)) {
    // La firma es en blanco, puedes manejarlo aquí si es necesario
    return null; // Devuelve null para indicar que la firma está en blanco
  }
  const dataURL = pad.toDataURL();
  return dataURL;
}

function crearSVGConFirma(pad) {
  if (isPadEmpty(pad)) {
    return null;
  }
  // Plantilla de SVG con la firma
  const svgPlantilla = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: transparent;">
      <image x="0" y="0" width="100%" height="100%" xlink:href="${pad.toDataURL()}" />
    </svg>
  `;
  return "data:image/svg+xml;base64," + btoa(svgPlantilla);
}
function clearPad(pad) {
  pad.clear();
}

document.querySelectorAll(".btn-clear").forEach((btn) => {
  btn.addEventListener("click", () => {
    const padName = btn.getAttribute("data-pad");
    const pad = padName === "vigilantePad" ? vigilantePad : usuarioPad;
    clearPad(pad);
  });
});
