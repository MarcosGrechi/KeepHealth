import { Routes } from '@angular/router';
import { DietDetailComponent } from './features/diet/diet-detail/diet-detail.component';
import { DietComponent } from './features/diet/diet.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { ExerciciosComponent } from './features/exercicios/exercicios.component';
import { authGuard } from './shared/auth.guard'; // Importa o guard de autenticação
import { DietDetailGuard } from './shared/services/permissions.service'; // Importa o guard de detalhes da dieta

// Definição das rotas da aplicação
export const routes: Routes = [
  {
    path: '', // Rota raiz da aplicação
    redirectTo: 'home', // Redireciona para a página inicial se nenhum caminho for fornecido
    pathMatch: 'full' // Verifica se o caminho está completamente vazio para redirecionar
  },
  {
    path: 'home', // Rota para a página inicial
    component: HomeComponent, // Componente associado: HomeComponent
    canActivate: [authGuard] // Guarda de rota: authGuard para autenticação
  },
  {
    path: 'login', // Rota para a página de login
    component: LoginComponent // Componente associado: LoginComponent
  },
  {
    path: 'cadastro', // Rota para a página de cadastro
    component: CadastroComponent // Componente associado: CadastroComponent
  },
  {
    path: 'profile', // Rota para a página de perfil
    component: ProfileComponent, // Componente associado: ProfileComponent
    canActivate: [authGuard] // Guarda de rota: authGuard para autenticação
  },
  {
    path: 'exercicios', // Rota para a página de exercícios
    component: ExerciciosComponent, // Componente associado: ExerciciosComponent
    canActivate: [authGuard] // Guarda de rota: authGuard para autenticação
  },
  {
    path: 'diet', // Rota para a página de dieta
    component: DietComponent, // Componente associado: DietComponent
    canActivate: [authGuard] // Guarda de rota: authGuard para autenticação
  },
  {
    path: 'diet', // Rota para detalhes da dieta
    canActivateChild: [DietDetailGuard], // Guarda de rota filha: DietDetailGuard para permissões de detalhes da dieta
    loadChildren: () => import('./features/diet/diet.module').then(m => m.DietModule), // Carrega módulo de dieta dinamicamente
  }
];
