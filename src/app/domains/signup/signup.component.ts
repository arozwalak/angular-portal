import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserApi} from "../api/UserApi";
import {catchError, EMPTY, take} from "rxjs";
import {SignupService} from "./data/signup.service";

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  providers: [SignupService, UserApi],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  router = inject(Router);
  signupService = inject(SignupService);

  signupForm: FormGroup = this.#createForm();
  errorMessage: string | null = null;

  signup() {
    this.errorMessage = null;

    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            this.errorMessage = error.error;
            return EMPTY;
          })
        )
        .subscribe((response) => {
          if (response === 'success') {
            this.router.navigate(['/login']);
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
