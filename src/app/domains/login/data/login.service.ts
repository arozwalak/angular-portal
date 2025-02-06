import {inject, Injectable} from "@angular/core";
import {UserApi} from "../../api/UserApi";

@Injectable()
export class LoginService {
  userApi = inject(UserApi);

  login({email, password}: { email: string, password: string }) {
    return this.userApi.login({email, password});
  }
}
