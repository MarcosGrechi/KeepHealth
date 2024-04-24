import { Routes } from '@angular/router';
import { DietComponent } from './features/diet/diet.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { ExerciciosComponent } from './features/exercicios/exercicios.component';
import { authGuard } from './shared/auth.guard'; 
import { DietDetailGuard } from './shared/services/permissions.service'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'cadastro', 
    component: CadastroComponent 
  },
  {
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'exercicios', 
    component: ExerciciosComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'diet', 
    component: DietComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'diet', 
    canActivateChild: [DietDetailGuard], 
    loadChildren: () => import('./features/diet/diet.module').then(m => m.DietModule), 
  }
];
