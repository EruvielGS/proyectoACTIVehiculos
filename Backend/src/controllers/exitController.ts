import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { getSalida, postSalida } from "../services/exitService";

const getExit = async (req: Request, res: Response) => {
  try {
    const response = await getSalida(req, res);
    res.status(200).json(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_SALIDA");
  }
  res.send("Jalando");
};

const postExit = (req: Request, res: Response) => {
    try {
        const response = postSalida(req, res);
    } catch (error) {
        handleHttp(res, "ERROR_POST_SALIDA");
    }
};

export { getExit, postExit };
