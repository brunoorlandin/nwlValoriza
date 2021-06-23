interface IErrorHandler {
  name: string,
  statusCode: number,
  message: string,
  description: string
}

class ErrorHandler {
  name: string;
  statusCode: number;
  message: string;
  description: string;



  constructor({ name, statusCode, message, description }: IErrorHandler) {
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.description = description;
  }
}

export { ErrorHandler };