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

    const body = { cUsuario: cUsuario, password: password };

    console.log('Body enviado al servidor:', body);


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  
      'Accept': 'application/json'
    });

    // Enviamos la solicitud POST al backend
    return this.http.post(this.UrlApiLogin, body, { headers: headers });
  }
}
