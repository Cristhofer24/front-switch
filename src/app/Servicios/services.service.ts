import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
   private ApiURL='http://localhost:8080/readAPI/message';
  constructor(private http:HttpClient) { }
  getMessage(input: string): Observable<string> {
    return this.http.get<string>(`${this.ApiURL}/message`, {
      params: { input },
    });
  }
}
