import { Component, OnInit } from '@angular/core';
import { IsoService } from '../../../../Servicios/ISO/iso.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  isoData: any[] = [];

  open:boolean=false;

  constructor(private isoService: IsoService){}
   private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.loadDat();
  }

  loadDat(): void{
    this.subscription = this.isoService.getIsoData().subscribe({
      next: (data) => {
        this.isoData = data;
      },

      error: (err) => {
        console.error('Error fetching ISO data:', err);
      },
    });



  }


}
