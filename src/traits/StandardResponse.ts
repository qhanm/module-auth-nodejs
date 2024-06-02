import { STATUS_CODES } from "http";
import { ObjectLiteral } from "typeorm";
import { StatusCode } from "../const/status-code.const";
import { StatusTypeConst } from "../const/status-type.const";

interface ConstructorType<T> {
  code?: string;
  message?: string;
  data?: T;
  page?: number;
  limit?: number;
  total?: number;
  errors?: ObjectLiteral;
}

export class StandardResponse<T> {
  code?: string;
  message?: string;
  data?: T;
  page?: number;
  limit?: number;
  total?: number;
  timestamp!: Date;
  errors?: ObjectLiteral;

  constructor(res?: ConstructorType<T>) {
    this.code = res?.code;
    this.message = res?.message;
    this.data = res?.data;
    this.page = res?.page;
    this.limit = res?.limit;
    this.total = res?.total;
    this.errors = res?.errors;
    this.timestamp = new Date();
  }
}

export class ServerInternalErrorResponse<T> extends StandardResponse<T> {
  constructor(res?: ConstructorType<T>) {
    super(res);

    this.message = "Server Internal Error";
    this.code = StatusTypeConst.SERVER_INTERNAL_ERROR;
  }
}

export class BadRequestResponse<T> extends StandardResponse<T> {
  constructor(res?: ConstructorType<T>) {
    super(res);
    this.code = StatusTypeConst.BAD_REQUEST;
  }
}
