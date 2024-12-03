import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PruebaAPI } from '../prueba-API/module'; // Asegúrate de que esta importación esté bien

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  // URL de la API
  private ApiURL = 'http://localhost:8080/api/usuarios-roles';

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener la lista de usuarios
   * @returns Observable<PruebaAPI[]> - Devuelve un observable con la lista de usuarios
   */
  listarUsuarios(): Observable<PruebaAPI[]> {
    return this.http.get<PruebaAPI[]>(this.ApiURL).pipe(
      // Manejo de errores para cualquier fallo en la solicitud HTTP
      catchError(error => {
        console.error('Error al obtener los usuarios', error);
        // El mensaje de error personalizado es opcional, puedes ajustarlo según lo necesites
        return throwError(() => new Error('Error al obtener los usuarios desde el servidor'));
      })
    );
  }


}

