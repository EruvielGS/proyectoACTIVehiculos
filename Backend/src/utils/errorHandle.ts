import { Response } from "express";

const handleHttp = (res: Response, message: string, error?:unknown) => {
  res.status(500);
  res.send({ error: message, e: error });
};

export { handleHttp };
