import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserComponent } from "./components/user/user.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
