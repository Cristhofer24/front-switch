import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { IsoService } from '../../../Servicios/ISO/iso.service';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgxPaginationModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit, OnDestroy {
  isoData: any[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 30; 
  wiso012LocalDateTime: string | null = null; 
  wiso015SettlementDatel: string | null = null; 
  private subscription: Subscription | null = null;
  row: any[] = [];
  constructor(private isoService: IsoService) {}
  
  ngOnInit(): void {
    this.loadIsoData();
  }

  // Cargar todos los datos
  loadIsoData(): void {
    this.subscription = this.isoService.getIsoData().subscribe({
      next: (data) => {
        this.isoData = data;
      },
      error: (err) => {
        console.error('Error fetching ISO data:', err);
      },
    });
  }
    
  // Cargar datos filtrados por rango de fechas
  loadIsoDataByDateRange(): void {
    if (this.wiso012LocalDateTime && this.wiso015SettlementDatel) {
      const formattedFromDate = this.wiso012LocalDateTime.trim();
      const formattedToDate = this.wiso015SettlementDatel.trim();
      
      const isValidFromDate = this.validateDate(formattedFromDate);
      const isValidToDate = this.validateDate(formattedToDate);
      
      if (isValidFromDate && isValidToDate) {
        this.isoService
          .getIsoDataByDateRange(formattedFromDate, formattedToDate)
          .subscribe({
            next: (data) => {
              this.isoData = data;
            },
            error: (err) => {
              console.error('Error fetching filtered ISO data:', err);
            },
          });
      } else {
        console.warn('Las fechas ingresadas no son válidas.');
      }
    } else {
      console.warn('Debe ingresar ambas fechas para realizar el filtro.');
    }
  }


  // Validar formato de fecha (YYYY-MM-DD)
  validateDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // Formato: YYYY-MM-DD HH:mm:ss
    if (!dateRegex.test(date)) {
      alert('La fecha debe tener el formato YYYY-MM-DD HH:mm:ss');
      return false;
    }
    return true;
  }
  
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  ///AQUI QUIERO QUE LE DES LA FUNCIONALIDAD AL ICONO DE RECARGAR EL LISTADO DE LA TABLA DE DATOS DE ISO 8583 CON EL BOTON DE RELOAD DE LA PAGINA EN EL HTML 

recargarIconoReload = () => {
  this.isoService.getIsoData().subscribe({
    next: (data) => {
      this.isoData = data;
    },
    error: (err) => {
      console.error('Error fetching ISO data:', err);
    },
  });
}





}





