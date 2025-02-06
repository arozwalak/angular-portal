import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../data/login.service";
import {UserApi} from "../../api/UserApi";
import {catchError, EMPTY, take} from "rxjs";

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  providers: [LoginService, UserApi],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  loginService = inject(LoginService);

  loginForm: FormGroup = this.#createForm();
  errorMessage: string | null = null;

  login() {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .pipe(
          take(1),
          catchError((error) => {
            this.errorMessage = error.error;
            return EMPTY;
          })
        )
        .subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user));
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
