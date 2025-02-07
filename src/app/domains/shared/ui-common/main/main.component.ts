import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "@app/shared/ui-common/sidebar/sidebar.component";
import {TopbarComponent} from "@app/shared/ui-common/topbar/topbar.component";

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
