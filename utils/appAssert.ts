import AppError from "./appError";
import assert from "assert";
import { HttpStatusCode } from "./httpStatusCode";
import AppErrorCode from "./appErrorCode";

type AppAssert = (
  condition: any,
  HttpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;


const appAssert: AppAssert = (condition, HttpStatusCode, message, appErrorCode) =>
  assert(condition, new AppError(HttpStatusCode, message, appErrorCode));

export default appAssert;
