import { Injectable } from '@angular/core';
import { Route, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private auth: AuthService
  ) { }

  canActivate(): boolean {
    const loggedIn = this.auth.isLoggedIn();

    if (!loggedIn) {
      this.auth.handleLogin();
    }

    return loggedIn;
  }
}
