import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AddressService {
  constructor(private http: HttpClient) {} 

  get(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`; 
    return this.http.get(url); 
  }
}
