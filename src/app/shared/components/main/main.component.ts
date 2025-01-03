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

  selectedRow: any = null; // Almacena los datos de la fila seleccionada para el modal
  displayedXml: string = ''; // Almacena el XML mostrado en el modal
  loading: boolean = false;

  // Variables para el filtro por rango de fechas
  wiso012LocalDateTime: string = '';
  wiso015SettlementDatel: string = '';

  private subscription: Subscription | null = null;

  constructor(private isoService: IsoService) {}

  ngOnInit(): void {
    this.loadIsoData();
  }

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

  // Validar formato de fecha (YYYY-MM-DD HH:mm:ss)
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

///Abrir y cerrar el modal
modalOpen(primaryKey: string): void {
  this.loading = true; // Inicia el indicador de carga
  setTimeout(() => {
    const foundRow = this.isoData.find((row) => row.wiso000MessageType === primaryKey);
    if (foundRow) {
      this.selectedRow = foundRow;
      this.displayedXml = foundRow.wiso114ExtendedData.slice(0, 5000); // Muestra solo los primeros 5000 caracteres
    }
    this.loading = false; // Finaliza el indicador de carga
  }, 100); // Simula un pequeño retardo para evitar congelamiento
}

// Mostrar más XML en el modal
loadMoreXml(): void {
  if (this.selectedRow && this.displayedXml.length < this.selectedRow.wiso114ExtendedData.length) {
    const currentLength = this.displayedXml.length;
    const nextChunk = this.selectedRow.wiso114ExtendedData.slice(currentLength, currentLength + 5000);
    this.displayedXml += nextChunk;
  }
}

// Cerrar modal
modalClose(): void {
  this.selectedRow = null;
  this.displayedXml = '';
}

}
