import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { getEntrada, postEntrada } from "../services/entryServices";

const getEntry = async (req: Request, res: Response) => {
  try {
    const response = await getEntrada(req, res);
    res.status(200).json(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ENTRY");
  }
};

const postEntry = (req: Request, res: Response) => {
  try {
    const response = postEntrada(req, res);
    res.status(200).json(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_ENTRY");
  }
};

export { getEntry, postEntry };
