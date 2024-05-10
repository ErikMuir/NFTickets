import { errorResponse } from "@/utils/server/api-responses";

export class RequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  toErrorResponse() {
    return errorResponse(this.message, this.status);
  }

  toErrorRedirect() {
    return {
      redirect: {
        destination: `/${this.status}`,
        permanent: false,
      },
    };
  }
}

export class BadRequestError extends RequestError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class NotFoundError extends RequestError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

export class ForbiddenError extends RequestError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class BadGatewayError extends RequestError {
  constructor(message = "Bad Gateway") {
    super(502, message);
  }
}
