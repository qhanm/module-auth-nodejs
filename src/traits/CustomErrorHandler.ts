import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "class-validator";
import { ObjectLiteral } from "typeorm";
import { StatusTypeConst } from "../const/status-type.const";
import { StatusCode } from "../const/status-code.const";
import {
  ServerInternalErrorResponse,
  StandardResponse,
} from "./StandardResponse";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    if (response.headersSent) {
      return next(error);
    }

    if (
      error?.errors?.every(
        (err: ValidationError) => err instanceof ValidationError
      )
    ) {
      const errorResponse: ObjectLiteral = {};

      error?.errors?.forEach((err: ValidationError) => {
        errorResponse[err.property] = Object.values(
          err.constraints as ObjectLiteral
        );
      });

      response.status(StatusCode.BAD_REQUEST).json(
        new StandardResponse({
          message: "Validation failed",
          code: StatusTypeConst.VALIDATION_ERROR,
          errors: errorResponse,
        })
      );
    } else if (error instanceof HttpError && error.httpCode === 400) {
      response.status(400).json({
        message: "Bad request",
        errors: error.message,
      });
    } else {
      response.status(500).json(new ServerInternalErrorResponse());
    }
  }
}
