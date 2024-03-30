import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  cadastroForm = new FormGroup(
    {
      name: new FormControl(""),
      email: new FormControl(""),
      weight: new FormControl(""),
      height: new FormControl(""),
      birthdate: new FormControl(""),
      cep: new FormControl(""),
      password: new FormControl(""),
      confirm_password: new FormControl("")
    }
  )
  usersList: any[] = this.getUsers();

  constructor(private router: Router) { };

  ngOnInit(): void {
    this.usersList = this.getUsers();
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

  authenticateEmail(email: string | null | undefined) {
    this.usersList = this.getUsers();
    return this.usersList.find((user: {
      email: string | null | undefined;
    }) => {
      if(user.email == email) {
        return user;
      }
      return undefined;
    });;
  }

  cadastro(){
    const inputs = [
      { "name": this.cadastroForm.value.name },
      { "E-mail": this.cadastroForm.value.email },
      { "Weight": Number(this.cadastroForm.value.weight) },
      { "Height": Number(this.cadastroForm.value.height) },
      { "Birthdate" : this.cadastroForm.value.birthdate },
      { "CEP" : this.cadastroForm.value.cep },
      { "Password": this.cadastroForm.value.password },
      { "Confirm Password": this.cadastroForm.value.confirm_password },
    ]

    const checkFormInputs = inputs.find((input) => {
      if(!Object.values(input)[0]) {
        alert(`Fill ${Object.keys(input)} field!`);
        return true;
      }
      return false;
    });

    if (!checkFormInputs){
      if(inputs[3]["Password"] === inputs[4]["Confirm Password"]) {
        if(this.authenticateEmail(inputs[1]["E-mail"])) {
          alert("User E-mail already taken!");
        } else {
          const newUser = {
            name: inputs[0]["name"],
            email: inputs[1]["E-mail"],
            weight: inputs[2]["Weight"],
            height: inputs[3]["Height"],
            birthdate: inputs[4]["Birthdate"],
            cep: inputs[5]["CEP"],
            password: inputs[6]["Password"],
            auth: false
          };
          this.usersList.push(newUser);
          localStorage.setItem("users", JSON.stringify(this.usersList));
          alert("Usuario criado!");
          this.cadastroForm.reset();
        }
      } else {
        alert("As senhas não correspondem!");
      }
    }
  }
}