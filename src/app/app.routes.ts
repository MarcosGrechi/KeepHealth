import { Routes} from '@angular/router';
import { DietDetailComponent } from './features/diet/diet-detail/diet-detail.component';
import { DietComponent } from './features/diet/diet.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CadastroComponent} from './features/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
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
    component: ProfileComponent
  },
  {
    path: 'diet',
    children: [
      { path: '', component: DietComponent },
      { path: ':id', component: DietDetailComponent },
    ]
  },
 
]
