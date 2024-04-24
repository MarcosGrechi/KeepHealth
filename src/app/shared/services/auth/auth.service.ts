import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 login(user: any): void {
    const storedData = JSON.parse(localStorage.getItem('registerData') || '[]');
    const email = user.email;
    const senha = user.password;

    const userMatch = storedData.find((userData: any) => userData.email === email && userData.senha === senha);

    if (userMatch) {
        localStorage.setItem('loggedUser', JSON.stringify(userMatch));
        this.router.navigate(['/home']); // Redirecione para a página inicial ou destino desejado
    } else {
        alert('Usuário ou senha inválidos'); // Exiba mensagem de erro
    }
}

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}