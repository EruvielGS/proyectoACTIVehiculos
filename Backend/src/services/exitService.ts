import { Request, Response } from "express";

const getSalida = (req: Request, res: Response) => {
  return "Jalando";
};

const postSalida = (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  return data;
};

export { getSalida, postSalida };
