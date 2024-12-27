import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf, CommonModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {



  userOption=false;
  userName: string = localStorage.getItem('userName') || '';
  userRole = localStorage.getItem('userRole') || '';

   constructor(private router: Router) {}

openUserOption(){
  this.userOption = !this.userOption;
}

logout(): void {
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  this.router.navigate(['/login']);
}

}
