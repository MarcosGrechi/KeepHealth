import { inject } from '@angular/core'; // Importa a função inject do Angular para injetar dependências
import { CanActivateFn, Router } from '@angular/router'; // Importa CanActivateFn para definir uma função de guarda e Router para navegação

// Definição da função de guarda de autenticação
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Obtém uma instância do serviço Router

  const isLogged = !!localStorage.getItem('loggedUser'); // Verifica se o usuário está logado recuperando os dados do usuário do armazenamento local

  if (isLogged) { // Se o usuário estiver logado, permite o acesso à rota
    return true; // Retorna true para permitir o acesso
  } else { // Se o usuário não estiver logado
    router.navigate(['/login']); // Redireciona para a página de login
    return false; // Retorna false para bloquear o acesso à rota
  }
};
