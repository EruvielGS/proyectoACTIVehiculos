function formatearFecha(fecha: Date): string {
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Sumar 1 porque enero es 0
  const año = fecha.getFullYear();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");

  return `${dia}-${mes}-${año}-${horas}-${minutos}-${segundos}`;
}

function getFechaFromFileName(fileName:string){
  const date = fileName.split("_");
  const marcaDeTiempo = parseInt(date[date.length - 1], 10);
  const fecha = new Date(marcaDeTiempo);

  return fecha.toISOString();
}

export {formatearFecha, getFechaFromFileName};