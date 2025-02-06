import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './domains/shared/ui-common/sidebar/sidebar.component';
import { TopbarComponent } from './domains/shared/ui-common/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-portal';
}
