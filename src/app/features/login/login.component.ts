import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup(
    {
      email: new FormControl(""), //  [Validators.required, ]
      password: new FormControl("")
    }
  )
  usersList: any[];
  // localStorage;

  constructor(private router: Router, private authService: AuthService) {
    // this.localStorage = document.defaultView?.localStorage; // workaround para utilizar DOM com SSR ativado
    this.usersList = this.getUsers();
  };

  ngOnInit(): void {
    
    this.usersList = this.getUsers();
    
    const logged = this.usersList.find((user: { auth: boolean; }) => user.auth == true);
    if(logged) {
      console.log("Redirecionando para home.")
      this.router.navigate([""]);
    }
  };

 

  getUsers(){ // : string[]
    const users = localStorage.getItem("users");
    if (!!users) {
      return JSON.parse(users);
    } else {
      localStorage.setItem("users", JSON.stringify([]));
      return [];
    };
  }

  signIn() {
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  
  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
  const user = this.authService.authenticateEmail(email, this.usersList);
  
  if (user) {
    const pass = this.authService.authenticatePassword(user, password);
    
    if (pass) {
      user.auth = true;
      localStorage.setItem("users", JSON.stringify(this.usersList));
      this.router.navigate(["/home"]);
      console.log("Você está logado.");
    } else {
      alert("Senha incorreta!");
    }
  } else {
    alert("E-mail do usuário inexistente!");
  }
}

forgotPassword() {
  const email = this.loginForm.value.email;
  if (email) {
    let user = this.usersList.find((user: { email: string | null | undefined; }) => user.email == email);
    if (user) {
      user.password = "123"; // Define a senha para "123"
      localStorage.setItem("users", JSON.stringify(this.usersList)); // Atualiza o localStorage com a nova senha
      alert("Sua senha foi alterada para: 123"); // Exibe um alerta com a nova senha
    } else {
      alert("E-mail do usuário inexistente!");
    }
  } else {
    alert("Preencha o campo E-mail!");
  }
}


}