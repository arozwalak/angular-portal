import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "./models/User";

@Injectable()
export class UserApi {
  login({email, password}: { email: string, password: string }) {
    const lsUsers = localStorage.getItem('users');
    const users = [];

    if (lsUsers) {
      users.push(...JSON.parse(lsUsers));
      const userMatch = users.filter((user) => user.email === email);
      if (userMatch.length > 0) {
        const user = userMatch[0];
        if (user.password === password) {
          return of({ firstName: user.firstName, lastName: user.lastName, email: user.email } as User);
        } else {
          return throwError(() => new HttpErrorResponse({error: 'Invalid credentials', status: 400}));
        }
      } else {
        return throwError(() => new HttpErrorResponse({error: 'Invalid credentials', status: 404}));
      }
    } else {
      return throwError(() => new HttpErrorResponse({error: 'Invalid credentials', status: 404}));
    }
  }

  signup({firstName, lastName, email, password}: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }): Observable<string | HttpErrorResponse> {
    const lsUsers = localStorage.getItem('users');
    const users = [];

    if (lsUsers) {
      users.push(...JSON.parse(lsUsers));
      const userMatch = users.filter((user) => user.email === email);
      if (userMatch.length > 0) {
        return throwError(() => new HttpErrorResponse({error: 'User already exists', status: 400}));
      } else {
        users.push({firstName, lastName, email, password});
        localStorage.setItem('users', JSON.stringify(users));
      }
    } else {
      users.push({firstName, lastName, email, password});
      localStorage.setItem('users', JSON.stringify(users));
    }

    return of('success');
  }
}
