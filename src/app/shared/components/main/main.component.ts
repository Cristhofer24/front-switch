import { Component } from '@angular/core';
import { FitSwitchAPIService } from '../../../Servicios/fit-switch-api.service';
import { NgFor } from '@angular/common';
//import { FitSwitch } from '../../../Interface/InterfaceFitSwitch';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  campos: FitSwitch[] = [];
  constructor(private apiservice:FitSwitchAPIService){}


  ngOnInit(): void {
    // Llamar al servicio para obtener los usuarios
    this.apiservice.listarCampos().subscribe(
      (data) => {
        this.campos = data; // Asigna los usuarios a la variable
        console.log('Datos obtenidos:', this.campos); // Verifica si los datos llegan
      },
      (error) => {
        console.error('Error al obtener los datos:', error); // Muestra errores si ocurren
      }
    );
  }

}
