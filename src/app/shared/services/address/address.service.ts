import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular
import { HttpClient } from '@angular/common/http'; // Importa o módulo HttpClient para fazer solicitações HTTP
import { Observable, firstValueFrom } from 'rxjs'; // Importa Observable e firstValueFrom de rxjs para lidar com fluxos de dados assíncronos

@Injectable({
  providedIn: 'root' // Indica que o serviço será fornecido em nível de aplicação (root), disponível em todo o aplicativo Angular
})
export class AddressService {
  constructor(private http: HttpClient) {} // Injeta o serviço HttpClient para fazer solicitações HTTP

  // Método para obter informações de endereço com base no CEP fornecido
  get(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`; // URL da API ViaCEP para obter informações de endereço com base no CEP
    return this.http.get(url); // Faz uma solicitação GET para a URL especificada e retorna um Observable com os dados
  }
}
