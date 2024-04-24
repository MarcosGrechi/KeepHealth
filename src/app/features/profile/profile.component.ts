import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule para fornecer diretivas comuns do Angular
import { Component, OnInit, Input } from '@angular/core'; // Importa o decorador Component e OnInit do Angular para criar um componente e implementar o ciclo de vida OnInit
import { AddressService } from '../../shared/services/address/address.service'; // Importa o serviço AddressService para obter informações de endereço
import { AgePipe } from '../../shared/pipes/age.pipe'; // Importa o pipe AgePipe para calcular a idade
import { HeightPipe } from '../../shared/pipes/height.pipe'; // Importa o pipe HeightPipe para formatar a altura
import { FormsModule } from '@angular/forms'; // Importa o módulo FormsModule para lidar com formulários no template
import { HeaderComponent } from '../../shared/components/header/header.component'; // Importa o componente HeaderComponent

@Component({
  selector: 'app-profile', // Seletor do componente
  standalone: true, // Marca este componente como independente, o que significa que ele não requer outros componentes Angular
  imports: [CommonModule, AgePipe, HeightPipe, FormsModule, HeaderComponent], // Importa os módulos e pipes necessários
  templateUrl: './profile.component.html', // URL do template HTML associado a este componente
  styleUrls: ['./profile.component.scss'] // URLs dos arquivos de estilo associados a este componente
})
export class ProfileComponent implements OnInit {
  @Input() userData: any; // Declara uma propriedade de entrada para receber dados do usuário

  cep = ""; // Variável para armazenar o CEP digitado pelo usuário
  address = ""; // Variável para armazenar o endereço obtido a partir do CEP
  showAddress = false; // Variável para controlar a exibição do endereço

  constructor(private addressService: AddressService) {} // Injeta o serviço AddressService para obter informações de endereço

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}'); // Obtém os dados do usuário logado do armazenamento local
    this.userData = loggedUser; // Atribui os dados do usuário logado à propriedade userData
  }

  // Método para pesquisar endereço com base no CEP digitado pelo usuário
  searchAddress(): void {
    this.addressService.get(this.cep).subscribe(data => { // Faz uma solicitação para obter o endereço com base no CEP
      this.address = `${data.logradouro} - ${data.bairro} - ${data.localidade}/${data.uf}`; // Formata o endereço obtido
      this.showAddress = true; // Define showAddress como true para exibir o endereço no template
    });
  }
}
