import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status = 500, message } = err;
  return res.status(status).json({ message });
};

export default errorMiddleware;
