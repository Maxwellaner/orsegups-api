import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';

type errorMiddlewareProps = {
  error: HttpException;
  req: Request;
  res: Response;
  next: NextFunction;
}

export default function errorMiddleware({ error, next, req, res }: errorMiddlewareProps): void {
  const status = error.status || 500;
  const message = error.message || 'Algo inesperado aconteceu';

  res.status(status).send({
    status, message
  })
}
