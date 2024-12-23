import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private apiAuth: FitcService, private router: Router) {}

  // Método para manejar el login
  onLogin(form: any): void {
    if (form.valid) {
      console.log('Datos del formulario:', form.value); // Verifica los datos enviados

      // Verificar si cUsuario y password tienen valores
      console.log('cUsuario:', form.value.cUsuario);
      console.log('password:', form.value.password);

      // Llamamos al servicio para realizar el login
      this.apiAuth.login(form.value.cUsuario, form.value.password).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          if (response && response.message === 'Login exitoso') {
            this.router.navigate(['/dashboard']);  // Redirige después del login exitoso
          } else {
            console.error('Error: Credenciales inválidas');
            alert('Credenciales inválidas');
          }
        },
        (error) => {
          console.error('Error en el login:', error);
          if (error.status === 401) {
            alert('Credenciales inválidas');
          } else {
            alert('Hubo un problema con el login. Revisa tus credenciales.');
          }
        }
      );

    } else {
      console.log('Formulario inválido');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
