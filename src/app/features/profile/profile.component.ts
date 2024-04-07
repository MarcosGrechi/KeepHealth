import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AddressService } from '../../shared/services/address/address.service';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { HeightPipe } from '../../shared/pipes/height.pipe';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
@Component({  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AgePipe, HeightPipe, FormsModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userData: any; // Receive user data as input
  cep = "";
  address = "";
  showAddress = false;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.userData = loggedUser;
  }

  searchAddress(): void {
    this.addressService.get(this.cep).subscribe(data => {
      this.address = `${data.logradouro} - ${data.bairro} - ${data.localidade}/${data.uf}`;
      this.showAddress = true;
    });
  }
}
