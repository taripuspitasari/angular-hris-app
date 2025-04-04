import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'Error';
  if (error.error?.errors) {
    errorMessage = error.error.errors;
  }

  return throwError(() => new Error(errorMessage));
}
