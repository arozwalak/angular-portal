import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {TopbarComponent} from "../topbar/topbar.component";

@Component({
  selector: 'app-main',
    imports: [
        RouterOutlet,
        SidebarComponent,
        TopbarComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
