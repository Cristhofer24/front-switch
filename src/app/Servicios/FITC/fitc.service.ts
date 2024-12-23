import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';  // Asegúrate de que esta importación sea correcta

@Injectable({
  providedIn: 'root'
})
export class FitcService {
  private UrlApiLogin = 'http://localhost:8080/api/login'; // URL de tu API

  constructor(private http: HttpClient) { }

  login(cUsuario: string, password: string): Observable<any> {
    // Encriptamos la contraseña usando MD5
    // const encryptedPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64); // Usamos Base64 para una representación más común

    // Construimos el cuerpo de la solicitud con la contraseña encriptada
    const body = { cUsuario: cUsuario, password: password };

    console.log('Body enviado al servidor:', body);  // Verifica si los datos son correctos

    // Definimos los encabezados para especificar el tipo de contenido JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Indicar que estamos enviando JSON
      'Accept': 'application/json'          // Asegura que también estamos esperando una respuesta JSON
    });

    // Enviamos la solicitud POST al backend
    return this.http.post(this.UrlApiLogin, body, { headers: headers });
  }
}
