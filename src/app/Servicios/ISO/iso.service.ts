import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsoService {
  //URL DE LA API DE SPRINGBOOT DE FITSWITCH
  private apiUrl = 'http://localhost:8081/api/iso-8583';

  constructor(private http: HttpClient) {}

  getIsoData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Retorna los datos desde la API
  }

}
