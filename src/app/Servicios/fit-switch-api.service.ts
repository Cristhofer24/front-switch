import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FitSwitch } from '../Interface/InterfaceFitSwitch';

@Injectable({
  providedIn: 'root'
})
export class FitSwitchAPIService {

  private FitAPISwitch ='http://localhost:8080/api/iso-8583';

  constructor(private http:HttpClient) { }

  listarCampos():Observable<FitSwitch[]>{
    return this.http.get<FitSwitch[]>(this.FitAPISwitch).pipe(
      // Manejo de errores para cualquier fallo en la solicitud HTTP
      catchError(error => {
        console.error('Error al obtener los usuarios', error);
        // El mensaje de error personalizado es opcional, puedes ajustarlo según lo necesites
        return throwError(() => new Error('Error al obtener los usuarios desde el servidor'));
      })
    );

  }



}
