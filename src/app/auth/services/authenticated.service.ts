import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticatedService {
  private isAuthenticated = false;

  public login(key: string, value: {}): void {
    this.isAuthenticated = true;

    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public logout(): void {
    this.isAuthenticated = false;

    window.localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
