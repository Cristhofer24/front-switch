import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitcService } from '../../Servicios/FITC/fitc.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  cUsuario: string = '';
  password: string = '';

  constructor(private apiAuth: FitcService) {}

  onLogin(form: any): void {
    if (form.valid) {
      console.log('Datos del formulario:', form.value); // Verifica los datos enviados

      // Verificar si cUsuario y password tienen valores
      console.log('cUsuario:', form.value.cUsuario); // Asegúrate de que no sea undefined
      console.log('password:', form.value.password);

      this.apiAuth.login(form.value.cUsuario, form.value.password).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        (error) => {
          console.error('Error en el login:', error);
          alert('Hubo un problema con el login. Revisa tus credenciales.');
        }
      );
    } else {
      console.log('Formulario inválido');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

}
