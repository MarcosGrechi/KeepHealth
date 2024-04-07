import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
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
    codigoUsuario: new FormControl('')
  });

  constructor(
    private Router: Router) { }

  cadastro() {
    const listaUsers = localStorage.getItem('cadastroData');
    const users = listaUsers ? JSON.parse(listaUsers) : [];

    const existingUser = users.find((user: any) => user.email === this.form.value.email);

    if (existingUser) {
      alert('User already exists.');
      
    } else {

      if (this.form.valid && this.form.value.senha === this.form.value.confirmarSenha) {

        const userCode = Math.floor(1000 + Math.random() * 9000);
        this.form.patchValue({ codigoUsuario: userCode.toString() });

        users.push(this.form.value);
        localStorage.setItem('cadastroData', JSON.stringify(users));
        
        this.form.controls['nome'].setValue('');
        this.form.controls['email'].setValue('');
        this.form.controls['dataNascimento'].setValue('');
        this.form.controls['peso'].setValue('');
        this.form.controls['altura'].setValue('');
        this.form.controls['senha'].setValue('');
        this.form.controls['confirmarSenha'].setValue('');

        this.Router.navigate(['/login']);
      } else {
        alert('formulario invalido');
      }
    }
  }

voltar(){
  this.Router.navigate(['/login']);
}

}