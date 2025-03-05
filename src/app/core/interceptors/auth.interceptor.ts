import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
