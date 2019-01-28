import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class NivelDevGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    const NivelAcesso = this.auth.getUsuario().nivelacesso;

    if (NivelAcesso === 3) {
      return true;
    } else {
      // this.router.navigate(['/']);
      // console.log('voce nao é nivel 3 e nao pode abrir esta pagina');      
      return false;
    }
  }
}
