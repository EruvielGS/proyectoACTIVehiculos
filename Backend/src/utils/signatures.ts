import fs from "fs";
import { join } from "path";
import { formatearFecha } from "./dateFns";

function signature(usuario: string, folio: string, firma: string | null) {
  //const fechaActual = new Date();
  //const formatDate = formatearFecha(fechaActual);
  //En lugar de ${Date.now()} => -${formatDate}
  if (!firma) {
    console.log("no hay firmas");
    return;
  }

  // Ruta donde se guardaran las firmas
  const firmasDirectory = join(__dirname, "..", "firmas");

  //Comprobar si existe el directorio
  if (!fs.existsSync(firmasDirectory)) {
    fs.mkdirSync(firmasDirectory);
  }
  const format = firma.split(",")[0].split("/")[1].split(";")[0];
  if (format === "png") {
    const firmaBuffer = Buffer.from(firma.split(",")[1], "base64");
    // Genera un nombre de archivo único (puedes usar un nombre más descriptivo)
    const arcName = `F_${usuario}_${folio}_${Date.now()}.png`;
    fs.writeFileSync(join(firmasDirectory, arcName), firmaBuffer);
  } else {
    const arcName = `F_${usuario}_${folio}_${Date.now()}.svg`;
    const firmaSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: transparent;">
      <image x="0" y="0" width="100%" height="100%" xlink:href="${firma}" />
    </svg>
  `;
    fs.writeFileSync(join(firmasDirectory, arcName), firmaSVG);
  }

  //Guarda la firma en el sistema de archivos
}
export { signature };
