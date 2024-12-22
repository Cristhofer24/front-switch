import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class FitcService {
  private UrlApiLogin = 'http://localhost:8080/api/login'; // URL de tu API

  constructor(private http: HttpClient) { }

  login(cusuario: string, password: string): Observable<any> {
    // Construimos el cuerpo de la solicitud con los datos correctos
    const body = { cUsuario: cusuario, password: password };  // Asegúrate de usar "cUsuario" en vez de "cusuario"

    console.log('Body enviado al servidor:', body); // Para verificar si los datos están correctos

    // No es necesario agregar encabezado 'Authorization' en este caso
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Especificamos que estamos enviando JSON
    });

    // Enviamos la solicitud POST al backend con el cuerpo y los encabezados
    return this.http.post(this.UrlApiLogin, body, { headers: headers });
  }
}
