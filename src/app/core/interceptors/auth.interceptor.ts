import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        'X-API-TOKEN': token,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
