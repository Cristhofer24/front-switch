import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../Servicios/services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  inputText ='';
  response = '';
  constructor(private apiRest:ServicesService) { }

  sendMessage() {
    this.apiRest.getMessage(this.inputText).subscribe((res) => {
      this.response = res;
    });
  }


}
