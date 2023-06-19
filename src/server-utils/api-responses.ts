import { NextApiResponse } from "next";

export type SuccessPayload<T> = {
  ok: true;
  data: T;
};

export type ErrorPayload = {
  ok: false;
  error: string;
};

export type StandardPayload<T> = SuccessPayload<T> | ErrorPayload;

export function success<T = unknown>(
  res: NextApiResponse<StandardPayload<T>>,
  data: T,
  statusCode = 200
) {
  return res.status(statusCode).json({ ok: true, data });
}

export function errorResponse<T = unknown>(
  res: NextApiResponse<StandardPayload<T>>,
  statusCode: number,
  error: string
) {
  return res.status(statusCode).json({ ok: false, error });
}

export function methodNotAllowed<T = unknown>(res: NextApiResponse<StandardPayload<T>>) {
  return errorResponse(res, 405, "Method not allowed");
}

export function notFound<T = unknown>(res: NextApiResponse<StandardPayload<T>>) {
  return errorResponse(res, 404, "Not Found");
}

export function badRequest<T = unknown>(
  res: NextApiResponse<StandardPayload<T>>,
  message = "Bad Request"
) {
  return errorResponse(res, 400, message);
}

export function unauthenticated<T = unknown>(res: NextApiResponse<StandardPayload<T>>) {
  return errorResponse(res, 401, "Unauthenticated");
}

export function forbidden<T = unknown>(res: NextApiResponse<StandardPayload<T>>) {
  return errorResponse(res, 403, "Forbidden");
}

export function serverError<T = unknown>(
  res: NextApiResponse<StandardPayload<T>>,
  message = "Unknown server error"
) {
  return errorResponse(res, 500, message);
}
