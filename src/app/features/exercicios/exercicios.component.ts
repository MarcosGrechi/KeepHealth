import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule para fornecer diretivas comuns do Angular
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'; // Importa o decorador Component, ElementRef, ViewChild e OnInit do Angular para criar um componente, acessar elementos do DOM e implementar o ciclo de vida OnInit
import { FormsModule } from '@angular/forms'; // Importa o módulo FormsModule para lidar com formulários no template
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet para lidar com roteamento
import { DialogModule } from 'primeng/dialog'; // Importa o módulo DialogModule do PrimeNG para criar dialogs
import { HeaderComponent } from '../../shared/components/header/header.component'; // Importa o componente HeaderComponent

// Interface para representar um exercício
export class Exercise {
  id: number;
  exercise: string;
  date: string;
  distance: number;
  time: number;

  constructor() {
    this.id = 0;
    this.exercise = '';
    this.date = '';
    this.distance = 0;
    this.time = 0;
  }
}

@Component({
  selector: 'app-exercicio', // Seletor do componente
  standalone: true, // Marca este componente como independente, o que significa que ele não requer outros componentes Angular
  imports: [ // Importa os módulos necessários
    RouterOutlet, // RouterOutlet para lidar com roteamento
    FormsModule, // FormsModule para lidar com formulários no template
    DialogModule, // DialogModule do PrimeNG para criar dialogs
    CommonModule, // CommonModule para fornecer diretivas comuns do Angular
    HeaderComponent, // HeaderComponent
  ],
  templateUrl: './exercicios.component.html', // URL do template HTML associado a este componente
  styleUrl: './exercicios.component.scss', // URL do arquivo de estilo associado a este componente
})
export class ExerciciosComponent implements OnInit {
  visible: boolean = false; // Variável para controlar a visibilidade do modal de exercício
  exerciseObj: Exercise = new Exercise(); // Objeto para armazenar os dados do exercício
  exerciseList: Exercise[] = []; // Lista de exercícios

  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud'); // Obtém os dados dos exercícios armazenados localmente
    if (localData != null) { // Se os dados existirem
      this.exerciseList = JSON.parse(localData); // Converte os dados para a lista de exercícios
    }
  }

  showDialog() { // Método para exibir o modal de exercício
    this.visible = true;
  }

  closeModal() { // Método para fechar o modal de exercício
    this.visible = false;
    this.exerciseObj = new Exercise(); // Reinicia o objeto de exercício
  }

  onDelete(item: Exercise) { // Método para excluir um exercício
    const isDelete = confirm('Tem certeza que quer deletar esse exercício?'); // Pede confirmação para excluir o exercício
    if (isDelete) { // Se a exclusão for confirmada
      const currentRecord = this.exerciseList.findIndex(m => m.id === item.id); // Encontra o índice do exercício na lista
      this.exerciseList.splice(currentRecord, 1); // Remove o exercício da lista
      localStorage.setItem('angular17crud', JSON.stringify(this.exerciseList)); // Atualiza os dados armazenados localmente
    }
  }

  onEdit(item: Exercise) { // Método para editar um exercício
    this.exerciseObj = { ...item }; // Copia os dados do exercício para o objeto de edição
    this.showDialog(); // Exibe o modal de exercício
  }

  updateExercise() { // Método para atualizar um exercício editado
    const index = this.exerciseList.findIndex(m => m.id === this.exerciseObj.id); // Encontra o índice do exercício na lista
    if (index !== -1) { // Se o exercício existir na lista
      this.exerciseList[index] = { ...this.exerciseObj }; // Atualiza os dados do exercício na lista
      localStorage.setItem('angular17crud', JSON.stringify(this.exerciseList)); // Atualiza os dados armazenados localmente
      this.closeModal(); // Fecha o modal de exercício
    }
  }

  saveExercise() { // Método para salvar um novo exercício
    if (this.exerciseObj.id === 0) { // Se o ID do exercício for 0 (novo exercício)
      this.exerciseObj.id = this.exerciseList.length + 1; // Define um novo ID para o exercício
      this.exerciseList.push({ ...this.exerciseObj }); // Adiciona o exercício à lista
    }
    localStorage.setItem('angular17crud', JSON.stringify(this.exerciseList)); // Atualiza os dados armazenados localmente
    this.closeModal(); // Fecha o modal de exercício
  }

  getExerciseImage(exercise: string): string { // Método para obter a imagem do exercício com base no tipo de exercício
    switch (exercise) {
      case 'corrida':
        return 'assets/images/run.jpg';
      case 'surf':
        return 'assets/images/surf.jpg';
      case 'bicicleta':
        return 'assets/images/bike.jpg';
      case 'futebol':
        return 'assets/images/futebol.jpg';
      case 'natação':
        return 'assets/images/natacao.jpg';
      case 'musculação':
        return 'assets/images/gym.jpg';
      default:
        return '';
    }
  }
}
