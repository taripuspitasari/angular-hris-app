import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', token),
    });

    return next(reqWithHeader);
  }
  return next(req);
};
