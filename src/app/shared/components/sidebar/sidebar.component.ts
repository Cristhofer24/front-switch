import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  Monitor=false;
  Administrador=false;
 constructor(private router: Router) {}
  ngOnInit(): void{
    if (localStorage.getItem('userRole') == 'MONITOR'){
      this.Monitor = true;
    }
    if (localStorage.getItem('userRole') == 'ADMINISTRADOR'){
      this.Administrador = true;
      this.Monitor = true;
    }
  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  
    ///Quiero que me crees una ventana de confirmación antes de cerrar la sesión pero al dar en cancelar no me deja salir
    /// hay algun error ya que al presionar en cancelar me sigue abriendo la ventana y me cierra sesión
    
    let opcion = window.confirm('¿Estas seguro de que quieres cerrar sesión?');
    if (opcion){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    } 
  }

}
