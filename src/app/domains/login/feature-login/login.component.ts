import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, EMPTY, take} from "rxjs";
import {AuthService} from "@app/shared/util-auth/auth.service";

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);

  loginForm: FormGroup = this.#createForm();
  errorMessage: string | null = null;

  login() {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            this.errorMessage = error.error;
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  #createForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
}
