import { ObjectLiteral } from "typeorm";

interface ConstructorType<T> {
  code?: string;
  message?: string;
  data?: T;
  page?: number;
  limit?: number;
  total?: number;
  errors: ObjectLiteral;
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

  constructor(res: ConstructorType<T>) {
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
