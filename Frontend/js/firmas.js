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

//Obtener los datos de las firmas en formato base64

function createDataURL(pad, format) {
  if(isPadEmpty(pad)) return null

  const formatMap = {
    png: undefined, // Formato predeterminado (image/png)
    svg: "image/svg+xml",
    //jpeg: "image/jpeg",
  };

  const validFormats = Object.keys(formatMap);

  if (!validFormats.includes(format)) {
    throw new Error("Formato no válido");
  }

  return pad.toDataURL(formatMap[format]);
}

document.querySelectorAll(".btn-clear").forEach((btn) => {
  btn.addEventListener("click", () => {
    const padName = btn.getAttribute("data-pad");
    const pad = padName === "vigilantePad" ? vigilantePad : usuarioPad;
    clearPad(pad);
  });
});
