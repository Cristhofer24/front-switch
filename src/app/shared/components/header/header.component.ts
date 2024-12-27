import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserComponent } from "./components/user/user.component";
import { TimeComponent } from "./components/time/time.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent, TimeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
