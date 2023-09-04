import { Request, Response } from "express";
import { signature } from "../utils/signatures";

const getSalida = (req: Request, res: Response) => {
  return "Jalando";
};

const postSalida = (req: Request, res: Response) => {
  const { folio, firmaVigilante, firmaUsuario } = req.body;
  
  signature("V", folio, firmaVigilante);
  signature("U", folio, firmaUsuario);
};

export { getSalida, postSalida };
