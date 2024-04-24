import { inject } from '@angular/core'; // Importa a função inject do Angular para injetar dependências
import { ActivatedRouteSnapshot, CanActivateChildFn, Router } from '@angular/router'; // Importa ActivatedRouteSnapshot e CanActivateChildFn para lidar com rotas e Router para navegação

// Definição da função de guarda para detalhes da dieta
export const DietDetailGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state) => {
  
  const router = inject(Router); // Obtém uma instância do serviço Router
  const id = childRoute.params['id']; // Obtém o parâmetro 'id' da rota filha
  const isLogged = !!localStorage.getItem('loggedUser'); // Verifica se o usuário está logado recuperando os dados do usuário do armazenamento local

  // Se o usuário não estiver logado, redireciona para a página de login e retorna falso para bloquear o acesso aos detalhes da dieta
  if (!isLogged) {
    router.navigate(['/login']); // Navega para a página de login
    return false; // Retorna falso para bloquear o acesso
  }

  // Se o parâmetro 'id' não for um número válido, redireciona para a página de dieta e retorna uma URLTree
  if (isNaN(parseInt(id, 10))) {
    return router.createUrlTree(['/diet']); // Cria uma árvore de URL para a página de dieta
  }
  
  return true; // Retorna true para permitir o acesso aos detalhes da dieta se todas as condições forem atendidas
};
