import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './login.component.html', 
  styleUrl: './login.component.scss' 
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup; 

  constructor(private router: Router, private authService: AuthService) { } 

  ngOnInit() {
    this.createForm(); 
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''), 
      password: new FormControl(''), 
    });
  }

  onSubmit() {
    const storedData = JSON.parse(localStorage.getItem('registerData') || '[]'); 
    const email = this.loginForm.get('email')?.value; 
    const password = this.loginForm.get('password')?.value; 

    const user = storedData.find((userData: any) => userData.email === email && userData.senha === password);

    if (user != undefined) { 
      localStorage.setItem('loggedUser', JSON.stringify(user)); 
      this.router.navigate(['/home']); 
      alert('Usuário ou senha inválidos'); 
    }
  }

  esqueciSenha() {
    const storedData = JSON.parse(localStorage.getItem('registerData') || '[]'); 
    const email = this.loginForm.get('email')?.value; 

    const userIndex = storedData.findIndex((userData: any) => userData.email === email);

    if (userIndex !== -1) { 
      storedData[userIndex].senha = 'a1b2c4d4';
      localStorage.setItem('registerData', JSON.stringify(storedData)); 
      alert('Sua senha foi alterada para a senha padrão: a1b2c4d4. Por favor, prossiga utilizando essa senha.'); 
    } else {
      alert('Usuário não encontrado'); 
    }
  }

  redirectToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  logout() {
    this.authService.logout(); 
  }
}
