import { Component, OnInit } from '@angular/core';
import { PruebaAPI } from '../module';
import { ServicesService } from '../../Servicios/services.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export default class TableComponent implements OnInit {
  usuarios: PruebaAPI[] = []; // Array para almacenar los usuarios

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    // Llamar al servicio para obtener los usuarios
    this.servicesService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data; // Asigna los usuarios a la variable
        console.log('Usuarios obtenidos:', this.usuarios); // Verifica si los datos llegan
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error); // Muestra errores si ocurren
      }
    );
  }
}
