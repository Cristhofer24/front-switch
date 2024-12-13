
import { Component, OnInit } from '@angular/core';
//import { FitSwitchAPIService } from '../../../Servicios/fit-switch-api.service';
import { NgFor } from '@angular/common';
import { IsoService } from '../../../Servicios/ISO/iso.service';
import { Subscription } from 'rxjs';
//import { FitSwitch } from '../../../Interface/InterfaceFitSwitch';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgxPaginationModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isoData: any[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 20; 
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
