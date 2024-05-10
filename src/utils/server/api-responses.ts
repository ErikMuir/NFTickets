import { NextResponse } from "next/server";

export type SuccessPayload<T> = {
  ok: true;
  data: T;
};

export type ErrorPayload = {
  ok: false;
  error: string;
};

export type StandardPayload<T> = SuccessPayload<T> | ErrorPayload;

export function nextResponse<T>(data: T, status: number): NextResponse<StandardPayload<T>> {
  const ok = status < 400;
  const payload: StandardPayload<T> = ok ? { ok, data } : { ok, error: `${data}` };
  return NextResponse.json(payload, { status });
}

export function success<T>(
  data: T,
  statusCode = 200
) {
  if (statusCode >= 400) statusCode = 200;
  return nextResponse(data, statusCode);
}

export function errorResponse(
  error: string,
  statusCode = 500,
) {
  if (statusCode < 400) statusCode = 500;
  return nextResponse(error, statusCode);
}

export function methodNotAllowed(message = "Method not allowed") {
  return errorResponse(message, 405);
}

export function notFound(message = "Not Found") {
  return errorResponse(message, 404);
}

export function badRequest(message = "Bad Request") {
  return errorResponse(message, 400);
}

export function unauthenticated(message = "Unauthenticated") {
  return errorResponse(message, 401);
}

export function forbidden(message = "Forbidden") {
  return errorResponse(message, 403);
}

export function serverError(message = "Unknown server error") {
  return errorResponse(message);
}

