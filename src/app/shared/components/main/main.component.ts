import { NgxPaginationModule } from 'ngx-pagination';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { IsoService } from '../../../Servicios/ISO/iso.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgxPaginationModule, FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit, OnDestroy {
  isoData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 40;

  // Variables para el filtro por rango de fechas
  wiso012LocalDateTime: string = '';
  wiso015SettlementDatel: string = '';
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



  


}









