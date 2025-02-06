import {inject, Injectable} from "@angular/core";
import {UserApi} from "../../api/UserApi";

@Injectable()
export class SignupService {
  userApi = inject(UserApi);

  signup({firstName, lastName, email, password}: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {
    return this.userApi.signup({firstName, lastName, email, password});
  }
}
