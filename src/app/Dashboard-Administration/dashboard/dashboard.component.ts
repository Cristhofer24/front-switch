import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { LayoutComponent } from "../../shared/components/layout/layout.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

}
