import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa o HttpClient e HttpHeaders do Angular para fazer solicitações HTTP
import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular
import { Observable } from 'rxjs'; // Importa Observable de rxjs para lidar com fluxos de dados assíncronos

@Injectable({
  providedIn: 'root' // Indica que o serviço será fornecido em nível de aplicação (root), disponível em todo o aplicativo Angular
})
export class DietService {

  constructor(private httpClient: HttpClient) { } // Injeta o serviço HttpClient para fazer solicitações HTTP

  // Método para listar todas as dietas
  listAll(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Cria um cabeçalho HTTP com o tipo de conteúdo JSON
    return this.httpClient.get("assets/diets.json", { headers }); // Faz uma solicitação GET para o arquivo JSON de dietas e retorna um Observable com os dados
  }
}
