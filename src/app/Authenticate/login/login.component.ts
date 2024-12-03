import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../Servicios/services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  cusuario = '';
  errorMessage = '';
  constructor(private apiRest:ServicesService , private router: Router) { }


}
