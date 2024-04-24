import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service'; // Importa o serviço AuthService para lidar com autenticação

@Component({
  selector: 'app-login',
  standalone: true, // Marca este componente como independente, o que significa que ele não requer outros componentes Angular
  imports: [ReactiveFormsModule, RouterLink], // Importa ReactiveFormsModule para formulários reativos e RouterLink para navegação entre rotas
  templateUrl: './login.component.html', // URL do template HTML associado a este componente
  styleUrl: './login.component.scss' // URL do arquivo de estilo associado a este componente
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Declaração da variável loginForm do tipo FormGroup

  constructor(private router: Router, private authService: AuthService) { } // Injeta o serviço Router para navegação e o serviço AuthService para autenticação

  ngOnInit() {
    this.createForm(); // Método chamado quando o componente é inicializado para criar o formulário de login
  }

  createForm() {
    // Criação do FormGroup que contém os controles do formulário de login
    this.loginForm = new FormGroup({
      email: new FormControl(''), // Controlador para o campo "email"
      password: new FormControl(''), // Controlador para o campo "password"
    });
  }

  onSubmit() {
    const storedData = JSON.parse(localStorage.getItem('registerData') || '[]'); // Obtém os dados registrados do armazenamento local
    const email = this.loginForm.get('email')?.value; // Obtém o valor do campo "email" do formulário
    const password = this.loginForm.get('password')?.value; // Obtém o valor do campo "password" do formulário

    // Procura pelo usuário com o email e senha fornecidos nos dados registrados
    const user = storedData.find((userData: any) => userData.email === email && userData.senha === password);

    if (user != undefined) { // Se o usuário for encontrado, realiza o login
      localStorage.setItem('loggedUser', JSON.stringify(user)); // Armazena os dados do usuário logado no armazenamento local
      this.router.navigate(['/home']); // Navega para a página inicial
    } else {
      alert('Usuário ou senha inválidos'); // Se o usuário não for encontrado, exibe uma mensagem de alerta
    }
  }

  esqueciSenha() {
    const storedData = JSON.parse(localStorage.getItem('registerData') || '[]'); // Obtém os dados registrados do armazenamento local
    const email = this.loginForm.get('email')?.value; // Obtém o valor do campo "email" do formulário

    // Procura pelo índice do usuário com o email fornecido nos dados registrados
    const userIndex = storedData.findIndex((userData: any) => userData.email === email);

    if (userIndex !== -1) { // Se o usuário for encontrado, redefine a senha para a senha padrão
      storedData[userIndex].senha = 'a1b2c4d4';
      localStorage.setItem('registerData', JSON.stringify(storedData)); // Atualiza os dados registrados no armazenamento local
      alert('Sua senha foi alterada para a senha padrão: a1b2c4d4. Por favor, prossiga utilizando essa senha.'); // Exibe uma mensagem de alerta
    } else {
      alert('Usuário não encontrado'); // Se o usuário não for encontrado, exibe uma mensagem de alerta
    }
  }

  redirectToCadastro() {
    this.router.navigate(['/cadastro']); // Navega para a página de cadastro
  }

  logout() {
    this.authService.logout(); // Realiza o logout utilizando o serviço AuthService
  }
}
