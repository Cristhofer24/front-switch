import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsoService {
  //URL DE LA API DE SPRINGBOOT DE FITSWITCH
  private apiUrl = 'http://localhost:8081/api/iso-8583';

  constructor(private http: HttpClient) {}

  getIsoData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para obtener datos filtrados usando los nombres exactos de los campos
  getIsoDataByDateRange(WISO_012_LOCALDATETIME: string, WISO_015_SETTLEMENTDATEL: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/filtrar`,
      { params: { WISO_012_LOCALDATETIME, WISO_015_SETTLEMENTDATEL } }
    );
  }  
}
