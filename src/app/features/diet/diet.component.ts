import { Component, OnInit } from '@angular/core'; // Importa o decorador Component e OnInit do Angular para criar um componente e implementar o ciclo de vida OnInit
import { HeaderComponent } from '../../shared/components/header/header.component'; // Importa o componente HeaderComponent
import './diets.mock'; // Importa o arquivo de simulação de dados de dieta
import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule para fornecer diretivas comuns do Angular
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // Importa FormControl e ReactiveFormsModule para lidar com formulários reativos
import { RouterModule, RouterOutlet } from '@angular/router'; // Importa RouterModule e RouterOutlet para lidar com roteamento
import { Router } from '@angular/router'; // Importa Router para navegação
import { DietService } from '../../shared/services/diet.service'; // Importa o serviço DietService para acessar as dietas

// Interface para representar os detalhes de uma dieta
export interface Diets {
  id: number;
  name: string;
  description: string;
  qttCalories: number;
  qttDaysFeed: number;
  imageLink: string;
}

@Component({
  selector: 'app-diet', // Seletor do componente
  standalone: true, // Marca este componente como independente, o que significa que ele não requer outros componentes Angular
  templateUrl: './diet.component.html', // URL do template HTML associado a este componente
  styleUrl: './diet.component.scss', // URL do arquivo de estilo associado a este componente
  imports: [
    HeaderComponent, // Importa o componente HeaderComponent
    CommonModule, // Importa o módulo CommonModule
    ReactiveFormsModule, // Importa o módulo ReactiveFormsModule para lidar com formulários reativos
    RouterOutlet, // Importa RouterOutlet para lidar com roteamento
    RouterModule, // Importa RouterModule para lidar com roteamento
  ],
})
export class DietComponent implements OnInit {
  listLoad: Diets[] = []; // Array para armazenar todas as dietas carregadas
  list: Diets[] = []; // Array para armazenar as dietas a serem exibidas na tela
  inputPesquisa = new FormControl(''); // FormControl para lidar com o campo de pesquisa

  constructor(private router: Router, private dietService: DietService) {} // Injeta Router para navegação e DietService para acessar as dietas

  ngOnInit() {
    let dietsData = localStorage.getItem('diets'); // Obtém os dados das dietas do armazenamento local
    if (dietsData) { // Se os dados das dietas existirem
      this.listLoad = JSON.parse(dietsData) as Diets[]; // Converte os dados das dietas para o formato de array de objetos Diets
      this.list = this.listLoad; // Inicializa a lista de dietas a serem exibidas com todas as dietas carregadas
    } else { // Se os dados das dietas não existirem
      alert('Dieta não encontrada'); // Exibe um alerta informando que nenhuma dieta foi encontrada
    }

    // Inscreve-se nas mudanças do valor do campo de pesquisa
    this.inputPesquisa.valueChanges.subscribe((val) => {
      this.pesquisa(val || ''); // Chama o método de pesquisa com o valor atual do campo de pesquisa
    });
  }

  // Método para filtrar as dietas com base no termo de pesquisa
  pesquisa(val: string) {
    if (val.length > 0) { // Se o termo de pesquisa tiver mais de 0 caracteres
      // Filtra as dietas cujo nome contenha o termo de pesquisa (ignorando maiúsculas e minúsculas)
      this.list = this.listLoad.filter((x) =>
        x.name.toLowerCase().includes(val.toLowerCase()),
      );
    } else { // Se o termo de pesquisa estiver vazio
      this.list = this.listLoad; // Retorna todas as dietas
    }
  }

  // Método para navegar para os detalhes de uma dieta específica
  goToDetails(id: number) {
    this.router.navigate(['/diet', id]); // Navega para a rota de detalhes da dieta com o ID fornecido
  }
}
