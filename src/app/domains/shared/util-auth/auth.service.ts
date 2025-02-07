import {computed, inject, Injectable, signal} from "@angular/core";
import {UserApi} from "@api/UserApi";
import {toSignal} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {User} from "@api/models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #userApi = inject(UserApi);

  readonly #currentUser = signal<User | null>(null);
  readonly currentUser = computed(() => this.#currentUser());
  readonly currentUserFullName = computed(() => `${this.#currentUser()?.firstName} ${this.#currentUser()?.lastName}`);

  login({email, password}: { email: string, password: string }) {
    return this.#userApi.login({email, password}).pipe(
      tap(() => {
        this.#currentUser.update(() => this.#userApi.getCurrentUser());
      })
    );
  }

  logout() {
    return this.#userApi.logout();
  }

  signup({firstName, lastName, email, password}: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {
    return this.#userApi.signup({firstName, lastName, email, password});
  }
}
