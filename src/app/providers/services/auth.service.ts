import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { isNull } from 'util';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/Operators';

import { Usuario } from '../../models/usuario.modal';

@Injectable()
export class AuthService {
  private UsuarioAtual: Usuario;

  constructor(
    private afa: AngularFireAuth,
    private afb: AngularFireDatabase,
    private router: Router
  ) {
    this.afa.authState.subscribe(user => {
      if (user) {

        // Silvino Miranda
        this.setUsuario();

        return this.afb.object<Usuario>(`usuario/${user.uid}`).valueChanges();

      }
    });
  }

  handleLogin() {
    return this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return typeof this.UsuarioAtual !== 'undefined';
  }

  login(user: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    const promise = this.afa.auth.signInWithEmailAndPassword(user.email, user.password);

    return new Promise<any>((resolve, reject) => {
      promise.then(() => {
        this.setUsuario(user.password);

        resolve();
      }).catch(reject);
    });
  }

  loginByEmail(email: string): Promise<firebase.auth.UserCredential> {
    return this.afa.auth.signInWithEmailLink(email, window.location.href);
  }

  createAuthUser(user: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  retrievePassword(userEmail: string) {
    return this.afa.auth.sendPasswordResetEmail(userEmail);
  }

  logout(): Promise<void> {
    const promise = this.afa.auth.signOut();

    return new Promise<any>((resolve, reject) => {
      promise.then(() => {
        this.UsuarioAtual = undefined;

        resolve();
      }).catch(reject);
    });
  }

  // Silvino Miranda
  getUsuario(): Usuario {
    if (this.UsuarioAtual !== Observable.create()) {
      return this.UsuarioAtual;
    } else {
      console.log('Fazer Login no Sistema');
    }
  }

  // Silvino Miranda
  private setUsuario(password?: string) {
    this.afa.authState.subscribe(user => {  ///  gkn8ySxUsHVh06TQBSNWtLJYhjl1
      if (user) {
        this.afb.object<Usuario>(`usuario/${user.uid}`).valueChanges()
          .subscribe(userC => {
            userC.senha = password;

            this.UsuarioAtual = userC;
          });
      }
    });
  }
}
