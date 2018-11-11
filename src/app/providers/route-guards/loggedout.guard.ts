import { Injectable } from '@angular/core';
import { Route, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const loggedIn = this.auth.isLoggedIn();

    if (loggedIn) {
      this.router.navigate(['/']);
    }

    return !loggedIn;
  }
}
