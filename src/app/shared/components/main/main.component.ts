import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { IsoService } from '../../../Servicios/ISO/iso.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgxPaginationModule, FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isoData: any[] = []; // Información de la tabla
  originalIsoData: any[] = []; // Backup de datos originales
  currentPage: number = 1;
  itemsPerPage: number = 40;

  // Variables para el filtro por rango de fechas
  wiso012LocalDateTime: string = '';
  wiso013LocalDate: string = '';

  private subscription: Subscription | null = null;

  constructor(private isoService: IsoService) {}

  ngOnInit(): void {
    this.loadIsoData();
  }

  // Cargar todos los datos al inicio
  loadIsoData(): void {
    this.subscription = this.isoService.getIsoData().subscribe({
      next: (data) => {
        this.isoData = data;
        this.originalIsoData = [...data]; // Backup de datos originales
      },
      error: (err) => {
        console.error('Error fetching ISO data:', err);
      },
    });
  }

  // Cargar datos filtrados por rango de fechas
  loadIsoDataByDateRange(): void {
    if (this.wiso012LocalDateTime.trim() === '' || this.wiso013LocalDate.trim() === '') {
      alert('Debe ingresar ambas fechas para realizar el filtro.');
      return;
    }

    const isValidFromDate = this.validateDate(this.wiso012LocalDateTime);
    const isValidToDate = this.validateDate(this.wiso013LocalDate);

    if (!isValidFromDate || !isValidToDate) {
      alert('Las fechas deben tener el formato YYYY-MM-DD HH:mm:ss');
      return;
    }

    this.isoService
      .getIsoDataByDateRange(this.wiso012LocalDateTime, this.wiso013LocalDate)
      .subscribe({
        next: (data) => {
          if (data.length === 0) {
            alert('No se encontraron registros para las fechas seleccionadas.');
            this.isoData = [...this.originalIsoData]; // Restaurar datos originales
          } else {
            this.isoData = data; // Mostrar datos filtrados
          }
        },
        error: (err) => {
          console.error('Error fetching filtered ISO data:', err);
        },
      });
  }

  // Validar formato de fecha (YYYY-MM-DD HH:mm:ss)
  validateDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // Formato: YYYY-MM-DD HH:mm:ss
    return dateRegex.test(date);
  }

  // Restaurar datos originales al borrar los inputs
  clearFilters(): void {
    if (this.wiso012LocalDateTime.trim() === '' && this.wiso013LocalDate.trim() === '') {
      this.isoData = [...this.originalIsoData]; // Restaurar datos originales
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
