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
  }

}
