import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Verifica si localStorage está definido antes de intentar acceder a él
    if (typeof localStorage !== 'undefined') {
      // Obtiene el token de autenticación almacenado en localStorage
      const authToken = localStorage.getItem('token');

      // Clona la solicitud y agrega el token de autenticación a las cabeceras si está disponible
      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return next.handle(authReq);
      }
    }

    // Si no hay token o localStorage no está disponible, simplemente pasa la solicitud sin modificar
    return next.handle(req);
  }
}
