import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Usuario } from '../../models/usuario.modal';

@Injectable()
export class AuthService {
  private UsuarioAtual: Usuario;

  constructor(
    private afa: AngularFireAuth,
    private afb: AngularFireDatabase,
    private router: Router
  ) { }

  login(user: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    const promise = this.afa.auth.signInWithEmailAndPassword(user.email, user.password);

    return new Promise<any>((resolve, reject) => {
      promise.then(credential => {
        this.setUsuario(credential.user.uid);
        resolve();
      }).catch(reject);
    });
  }

  createAuthUser(user: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  sendEmail(pUser: firebase.User) {
    let user = pUser; // firebase.auth().currentUser;

    user.sendEmailVerification().then(() => {
      // Email sent.
    }).catch((error) => {
      // An error happened.
    });
  }

  deleteUser(pUser: firebase.User) {
    let user = pUser; // firebase.auth().currentUser;

    user.delete().then(() => {
      // User deleted.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }

  retrievePassword(userEmail: string) {
    return this.afa.auth.sendPasswordResetEmail(userEmail);
  }

  logout(): Promise<void> {
    const promise = this.afa.auth.signOut();

    return new Promise<any>((resolve, reject) => {
      promise.then(() => {
        this.UsuarioAtual = undefined;
        this.router.navigate(['/login']);

        resolve();
      }).catch(reject);
    });
  }

  // Silvino Miranda
  getUsuario(): Usuario {
    return this.UsuarioAtual;
  }

  // Silvino Miranda
  private setUsuario(pUid: string) {
    if (pUid) {
      this.afb.object<Usuario>(`usuario/${pUid}`).valueChanges()
        .subscribe(userC => {
         // console.log(userC);
          this.UsuarioAtual = userC;
        });
    }
  }

  // Aula de Tarso
  isLoggedIn(): boolean {
    return typeof this.UsuarioAtual !== 'undefined';
  }

  handleLogin() {
    this.router.navigate(['/login']);
  }
}
