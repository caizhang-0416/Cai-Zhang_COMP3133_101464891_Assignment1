import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private apollo: Apollo) {

  }
  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('auth_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout() {
      localStorage.removeItem('auth_token');
      this.loggedIn.next(false);
  }

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`query {
        login(email: "${email}", password: "${password}") {
          userId,
          username,
          token
        }
      }`
    }).pipe(map((result: any) => {
      const token = result.data.login?.token;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('username', result.data.login?.username);
      this.loggedIn.next(true);
      return result;
    }));
  }

  signup(username: string, password: string, email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation {
        signup(username: "${username}", password: "${password}", email: "${email}") {
          _id
          username
          email
        }
      }`
    }).pipe(map((result: any) => {
      const token = result.data.signup?.token;
      localStorage.setItem('auth_token', token);
    }));
  }
}
