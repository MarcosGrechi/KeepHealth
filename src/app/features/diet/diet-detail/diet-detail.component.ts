import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule para fornecer diretivas comuns do Angular
import { Component, OnInit } from '@angular/core'; // Importa o decorador Component e OnInit do Angular para criar um componente e implementar o ciclo de vida OnInit
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute do Angular para acessar os parâmetros da rota
import { HeaderComponent } from '../../../shared/components/header/header.component'; // Importa o componente HeaderComponent

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
  selector: 'app-diet-detail', // Seletor do componente
  standalone: true, // Marca este componente como independente, o que significa que ele não requer outros componentes Angular
  templateUrl: './diet-detail.component.html', // URL do template HTML associado a este componente
  styleUrl: './diet-detail.component.scss', // URL do arquivo de estilo associado a este componente
  imports: [CommonModule, HeaderComponent], // Importa os módulos necessários
})
export class DietDetailComponent implements OnInit {
  diet: Diets | undefined; // Variável para armazenar os detalhes da dieta atual
  listLoad: Diets[] | undefined; // Variável para armazenar a lista de dietas

  constructor(private route: ActivatedRoute) {} // Injeta o serviço ActivatedRoute para acessar os parâmetros da rota

  ngOnInit() {
    let dietsData = localStorage.getItem('diets'); // Obtém os dados das dietas do armazenamento local
    if (dietsData) { // Se os dados das dietas existirem
      this.listLoad = JSON.parse(dietsData) as Diets[]; // Converte os dados das dietas para o formato de array de objetos Diets
      let id = this.route.snapshot.paramMap.get('id'); // Obtém o parâmetro 'id' da rota atual
      if (id) { // Se o parâmetro 'id' existir
        let dietId = +id; // Converte o parâmetro 'id' para o tipo número
        this.diet = this.listLoad.find((diet) => diet.id === dietId); // Procura a dieta correspondente ao 'id' na lista de dietas
      }
    }
  }
}
