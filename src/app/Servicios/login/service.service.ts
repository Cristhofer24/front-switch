import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  //URL DE LA API DE SPRING BOOT DE LA BASE FITSWITCH
   private ApiURL='http://localhost:8080/api/iso8583';
  constructor(private http:HttpClient) { }
  getMessage(input: string): Observable<string> {
    return this.http.get<string>(`${this.ApiURL}/message`, {
      params: { input },
    });
  }
}

