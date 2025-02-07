import {Component, inject} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "@app/shared/util-auth/auth.service";
import {map, take} from "rxjs";

@Component({
  selector: 'app-topbar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  faUser = faUser;
  readonly currentUserFullName = this.#authService.currentUserFullName;

  logout() {
    this.#authService.logout().pipe(
      take(1),
      map((response) => {
        if (response === 'success') {
          this.#router.navigate(['/login']);
        }
      })
    ).subscribe();
  }
}
