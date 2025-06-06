import AppErrorCode from "./appErrorCode";
import { HttpStatusCode } from "./httpStatusCode";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;

new AppError(200, "msg", AppErrorCode.InvalidAccessToken);
