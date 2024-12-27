import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void{
    if (localStorage.getItem('userRole') == 'MONITOR'){
      this.Monitor = true;
    }
    if (localStorage.getItem('userRole') == 'ADMINISTRADOR'){
      this.Administrador = true;
      this.Monitor = true;
    }
  }

}
