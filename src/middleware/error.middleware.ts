import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';

type ErrorMiddlewareProps = {
  error: HttpException;
  res: Response;
}

export default function ErrorMiddleware({ error, res }: ErrorMiddlewareProps): void {
  const status = error.status || 500;
  const message = error.message || 'Something unexpected happened';

  res.status(status).send({
    status, message
  })
}
