import {computed, inject, Injectable} from "@angular/core";
import {UserApi} from "@api/UserApi";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #userApi = inject(UserApi);

  readonly #currentUser = toSignal(this.#userApi.getCurrentUser());
  readonly currentUser = computed(() => this.#currentUser());
  readonly currentUserFullName = computed(() => `${this.#currentUser()?.firstName} ${this.#currentUser()?.lastName}`);

  login({email, password}: { email: string, password: string }) {
    return this.#userApi.login({email, password});
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
