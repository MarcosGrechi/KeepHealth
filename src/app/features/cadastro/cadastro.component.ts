
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorService } from '../../shared/services/validator/custom-validator.service';
import { Router } from '@angular/router';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { HeightPipe } from '../../shared/pipes/height.pipe';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AgePipe, HeightPipe], //Importação do Modulo de Reative Forms
  providers: [CustomValidatorService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, this.customValidatorService.validarNomeCompleto()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dataNascimento: new FormControl('', Validators.required),
    peso: new FormControl('', [Validators.required, Validators.max(300)]),
    altura: new FormControl('', [Validators.required, Validators.max(280)]),
    senha: new FormControl('', [Validators.minLength(4), Validators.required]),
    confirmarSenha: new FormControl('', [Validators.minLength(4), Validators.required]),
    codigoUsuario: new FormControl('')
  });

  constructor(
    private customValidatorService: CustomValidatorService,
    private Router: Router) { }

  cadastrar() {
    if (this.form.valid && this.form.value.senha === this.form.value.confirmarSenha) {
      const userCode = Math.floor(1000 + Math.random() * 9000);


      const formData = this.form.value;

      localStorage.setItem('cadastroData', JSON.stringify(formData))
      
      this.form.controls['nome'].setValue('');
      this.form.controls['email'].setValue('');
      this.form.controls['dataNascimento'].setValue('');
      this.form.controls['peso'].setValue('');
      this.form.controls['altura'].setValue('');
      this.form.controls['senha'].setValue('');
      this.form.controls['confirmarSenha'].setValue('');

      this.Router.navigate(['/login']);

    } else {
      alert('forumulario invalido')
    }
  }

  

  goToLogin(){
    this.Router.navigate(['/login']);
  }

}
