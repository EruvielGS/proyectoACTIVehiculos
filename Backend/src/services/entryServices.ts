import { Request, Response } from "express";


let corde: any;
// let coordenadas:any;

const getEntrada = (req: Request, res: Response) => {
  console.log(corde);
  return corde;
};

const postEntrada = (req: Request, res: Response) => {
  const {coordenadas} = req.body;
  console.log(coordenadas);
  corde = coordenadas;

  return "se recibieron las coordenadas";
  //return data;
};

export { getEntrada, postEntrada };
