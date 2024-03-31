import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private router: Router) { }

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
    const storedData = JSON.parse(localStorage.getItem('cadastroData') || '{}');
    
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    if (storedData.email === email && storedData.senha === password) {
      this.router.navigate(['/perfil'], { state: { userData: storedData } });
    } else {
      alert('Usuário ou senha inválidos');
    }
  }

  esqueciSenha() {
    const storedData = JSON.parse(localStorage.getItem('cadastroData') || '{}');
    storedData.senha = 'a1b2c4d4';
    localStorage.setItem('cadastroData', JSON.stringify(storedData));
    alert('Sua senha foi alterada para a senha padrão: a1b2c4d4. Por favor, prossiga utilizando essa senha.');
  }

  redirectToCadastro() {
    this.router.navigate(['/home']);
  }

}