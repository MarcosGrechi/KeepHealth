// diet.component.ts
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import './diets.mock';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DietService } from '../../shared/services/diet.service';

export interface Diets {
  id: number;
  name: string;
  description: string;
  qttCalories: number;
  qttDaysFeed: number;
  imageLink: string;
}

@Component({
  selector: 'app-diet',
  standalone: true,
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.scss',
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
})
export class DietComponent implements OnInit {
  listLoad: Diets[] = [];
  list: Diets[] = [];
  inputPesquisa = new FormControl('');

  constructor(private router: Router, private dietService: DietService) {}
  ngOnInit() {
    let dietsData = localStorage.getItem('diets');
    if (dietsData) {
      this.listLoad = JSON.parse(dietsData) as Diets[];
      this.list = this.listLoad;
    } else {
      alert('Dieta não encontrada');
    }

    this.inputPesquisa.valueChanges.subscribe((val) => {
      this.pesquisa(val || '');
    });
  }

  pesquisa(val: string) {
    if (val.length > 0) {
      this.list = this.listLoad.filter((x) =>
        x.name.toLowerCase().includes(val.toLowerCase()),
      );
    } else {
      this.list = this.listLoad;
    }
  }

  
  goToDetails(id: number) {
    this.router.navigate(['/diet', id]);
  }
}