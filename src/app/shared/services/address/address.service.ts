import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private httpClient: HttpClient) {}

  get(cep: string): Observable<any> {
    const url = `${this.baseUrl}${cep}/json/`;
    return this.httpClient.get(url);
  }
}