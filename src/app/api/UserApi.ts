import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {faker} from "@faker-js/faker";
import {User} from "@api/models/User";

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login({email, password}: { email: string, password: string }) {
    const lsUsers = localStorage.getItem('users');
    const users: User[] = [];

    if (lsUsers) {
      users.push(...JSON.parse(lsUsers));
    } else {
      return throwError(() => new HttpErrorResponse({error: 'Invalid credentials', status: 404}));
    }

    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
      const userWithoutPassword: User = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return of(userWithoutPassword);
    } else {
      return throwError(() => new HttpErrorResponse({error: 'Invalid credentials', status: 404}));
    }
  }

  logout(): Observable<string> {
    localStorage.removeItem('user');
    return of('success');
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
    }

    if (users.find((user) => user.email === email)) {
      return throwError(() => new HttpErrorResponse({error: 'User already exists', status: 400}));
    } else {
      users.push({id: faker.string.uuid(), firstName, lastName, email, password});
      localStorage.setItem('users', JSON.stringify(users));
    }

    return of('success');
  }
}
