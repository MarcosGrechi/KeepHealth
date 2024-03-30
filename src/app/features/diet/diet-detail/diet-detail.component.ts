import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

export interface Diets {
  id: number;
  name: string;
  description: string;
  qttCalories: number;
  qttDaysFeed: number;
  imageLink: string;
}

@Component({
  selector: 'app-diet-detail',
  standalone: true,
  templateUrl: './diet-detail.component.html',
  styleUrl: './diet-detail.component.scss',
  imports: [CommonModule, HeaderComponent],
})
export class DietDetailComponent implements OnInit {
  diet: Diets | undefined;
  listLoad: Diets[] | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let dietsData = localStorage.getItem('diets');
    if (dietsData) {
      this.listLoad = JSON.parse(dietsData) as Diets[];
      let id = this.route.snapshot.paramMap.get('id');
      if (id) {
        let dietId = +id;
        this.diet = this.listLoad.find((diet) => diet.id === dietId);
      }
    }
  }
}