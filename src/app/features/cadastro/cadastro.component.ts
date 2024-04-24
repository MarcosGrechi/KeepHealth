import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {

  
  form = new FormGroup({
    nome: new FormControl('', Validators.required), 
    email: new FormControl('', [Validators.required, Validators.email]), 
    dataNascimento: new FormControl('', Validators.required), 
    peso: new FormControl('', [Validators.required, Validators.max(200)]), 
    altura: new FormControl('', [Validators.required, Validators.max(230)]), 
    senha: new FormControl('', [Validators.minLength(6), Validators.required]), 
    confirmarSenha: new FormControl('', [Validators.minLength(6), Validators.required]), 
  });

  constructor(
    private Router: Router) { } 

  cadastro() {
    const listaUsers = localStorage.getItem('registerData');
    const users = listaUsers ? JSON.parse(listaUsers) : []; 

    const existingUser = users.find((user: any) => user.email === this.form.value.email); 

    if (existingUser) { 
      alert('Esse usuario já existe.'); 
    } else {
      if (this.form.valid && this.form.value.senha === this.form.value.confirmarSenha) { 
        
        users.push(this.form.value); 
        localStorage.setItem('registerData', JSON.stringify(users)); 
        
        this.form.reset(); 
        this.Router.navigate(['/login']); 
      } else {
        alert('formulario inválido'); 
      }
    }
  }

  voltar(){
    this.Router.navigate(['/login']);
  }
}
