import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../../providers/services/auth.service';

import { configuration } from '../../../config/configuration';

import { ErrorReason } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private classes = ['hold-transition', 'login-page'];
  public emailToRecovery: string;
  public isSubmitting = false;
  public msgFeedback: string;
  public projectName = configuration.projectName;

  constructor(
    private auth: AuthService
  ) { }  //private loginService: loginService

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.add(cl);
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.remove(cl);
    }
  }

  public recoveryPassword(): void {
    this.isSubmitting = true;
    this.msgFeedback = '';

    this.auth.retrievePassword(this.emailToRecovery).then(ret => {
      this.msgFeedback = 'Email de recuperação enviado com sucesso.';
      this.isSubmitting = false;
    }).catch((reason: ErrorReason) => {
      if (reason.code === 'auth/invalid-email') {
        this.msgFeedback = 'Email de recuperação invalido!';
        this.isSubmitting = false;
      }
    });
  }

}
