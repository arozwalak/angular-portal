import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, EMPTY, take} from "rxjs";
import {AuthService} from "@app/shared/util-auth/auth.service";

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);

  readonly signupForm: FormGroup = this.#createForm();
  errorMessage: string | null = null;

  signup() {
    this.errorMessage = null;

    if (this.signupForm.valid) {
      this.#authService.signup(this.signupForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            this.errorMessage = error.error;
            return EMPTY;
          })
        )
        .subscribe((response) => {
          if (response === 'success') {
            this.#router.navigate(['/login']);
          }
        });
    }
  }

  #createForm() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
}
