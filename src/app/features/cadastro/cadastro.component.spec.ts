import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from '../../services/address.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
})
export class CadastroComponent {
  cadastroForm: FormGroup | any;

  constructor(
    private router: Router,
    private addressService: CepService,
  ) {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      weight: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      userCode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      location: new FormControl('', Validators.required),
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      if (
        this.cadastroForm.value.password ===
        this.cadastroForm.value.confirmPassword
      ) {
        let formData = { ...this.cadastroForm.value };

        localStorage.setItem('userData', JSON.stringify(formData));

        alert('Usuário cadastrado com sucesso!');
      } else {
        alert('As senhas não correspondem!');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente!');
    }
  }

  pesquisarCEP() {
    const cep = this.cadastroForm.get('location').value;
    this.addressService.get(cep).subscribe((data: any) => {
      const enderecoElement = document.getElementById('endereco');
      if (data.erro) {
        if (enderecoElement) {
          enderecoElement.innerText = 'CEP não encontrado!';
        }
      } else {
        const endereco = `${data.logradouro}, ${data.complemento} - ${data.bairro} - ${data.localidade}/${data.uf}`;
        if (enderecoElement) {
          enderecoElement.innerText = endereco;
        }
      }
    });
  }

  backLogin() {
    this.router.navigate(['/login']);
  }
}