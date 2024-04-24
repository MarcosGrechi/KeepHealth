import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa classes necessárias para formulários reativos
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule para formulários reativos e CommonModule para diretivas comuns do Angular
  providers: [],
  templateUrl: './cadastro.component.html', // URL do template HTML associado a este componente
  styleUrl: './cadastro.component.scss' // URL do arquivo de estilo associado a este componente
})

export class CadastroComponent {

  // Criação do FormGroup que contém os controles do formulário
  form = new FormGroup({
    nome: new FormControl('', Validators.required), // Controlador para o campo "nome" com validação de campo obrigatório
    email: new FormControl('', [Validators.required, Validators.email]), // Controlador para o campo "email" com validação de campo obrigatório e formato de e-mail
    dataNascimento: new FormControl('', Validators.required), // Controlador para o campo "dataNascimento" com validação de campo obrigatório
    peso: new FormControl('', [Validators.required, Validators.max(200)]), // Controlador para o campo "peso" com validação de campo obrigatório e valor máximo de 200
    altura: new FormControl('', [Validators.required, Validators.max(230)]), // Controlador para o campo "altura" com validação de campo obrigatório e valor máximo de 230
    senha: new FormControl('', [Validators.minLength(6), Validators.required]), // Controlador para o campo "senha" com validação de comprimento mínimo de 6 caracteres e campo obrigatório
    confirmarSenha: new FormControl('', [Validators.minLength(6), Validators.required]), // Controlador para o campo "confirmarSenha" com validação de comprimento mínimo de 6 caracteres e campo obrigatório
  });

  constructor(
    private Router: Router) { } // Injeção do serviço Router para navegação

  // Método chamado quando o formulário é submetido
  cadastro() {
    const listaUsers = localStorage.getItem('registerData'); // Obtém a lista de usuários do armazenamento local
    const users = listaUsers ? JSON.parse(listaUsers) : []; // Converte a lista de usuários em um array JavaScript ou inicializa como um array vazio se não houver dados

    const existingUser = users.find((user: any) => user.email === this.form.value.email); // Verifica se já existe um usuário com o mesmo e-mail

    if (existingUser) { // Se o usuário já existir, exibe um alerta
      alert('Esse usuario já existe.'); 
    } else {
      if (this.form.valid && this.form.value.senha === this.form.value.confirmarSenha) { // Se o formulário for válido e as senhas coincidirem
        
        users.push(this.form.value); // Adiciona os dados do formulário ao array de usuários
        localStorage.setItem('registerData', JSON.stringify(users)); // Salva a lista atualizada de usuários no armazenamento local
        
        // Limpa os campos do formulário após a submissão bem-sucedida
        this.form.reset(); 

        // Navega para a página de login após o cadastro bem-sucedido
        this.Router.navigate(['/login']); 
      } else {
        alert('formulario inválido'); // Se o formulário for inválido, exibe um alerta
      }
    }
  }

  // Método para navegar de volta para a página de login
  voltar(){
    this.Router.navigate(['/login']);
  }
}
