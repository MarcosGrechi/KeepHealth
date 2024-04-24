import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { DialogModule } from 'primeng/dialog'; 
import { HeaderComponent } from '../../shared/components/header/header.component'; 


@Component({
  selector: 'app-exercicio', 
  standalone: true, 
  imports: [
    FormsModule, 
    DialogModule, 
    CommonModule, 
    HeaderComponent, 
  ],
  templateUrl: './exercicios.component.html',
  styleUrl: './exercicios.component.scss', 
})
export class ExerciciosComponent implements OnInit {
  
  displayDialog: boolean = false;
  newActivity: any = {};
  activityTypes: string[] = ['Corrida', 'Surf', 'Bicicleta', 'Futebol', 'Natação', 'Academia'];
  activities: any[] = [];

  ngOnInit(): void {
    this.loadActivities(); 
  }
  
  loadActivities(): void {
    const storedActivities = localStorage.getItem('atividades');
    this.activities = storedActivities ? JSON.parse(storedActivities) : [];
  }

  showDialog() {
    this.newActivity = {}; 
    this.displayDialog = true;
  }

  saveActivity() {
    let activities: any[] = JSON.parse(localStorage.getItem('atividades') ?? '[]');
  
    activities.push(this.newActivity);
  
    localStorage.setItem('atividades', JSON.stringify(activities));
  
    this.loadActivities(); 
  
    this.displayDialog = false;
  }

  cancelActivity() {
    this.newActivity = {}; 
    this.displayDialog = false;
  }

  deleteActivity(activity: any): void {
    const index = this.activities.indexOf(activity); 
    if (index !== -1) {
        this.activities.splice(index, 1); 
        localStorage.setItem('atividades', JSON.stringify(this.activities));
    }
}

  getActivityImage(activityType: string): string {
    switch (activityType.toLowerCase()) {
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
      case 'academia':
        return 'assets/images/gym.jpg';
      default:
        return '';
    }
  }
}