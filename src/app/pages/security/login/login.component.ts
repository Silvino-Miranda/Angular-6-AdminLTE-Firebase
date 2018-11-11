import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../providers/services/auth.service';

import { configuration } from '../../../configuration';
import { PadraoComponent } from '../../../components/padrao.component';
import { environment } from 'environments/environment';

export interface ErrorReason {
  code: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends PadraoComponent implements OnInit, OnDestroy {


  private classes = ['hold-transition', 'login-page'];
  public projectName = configuration.projectName;

  public isFormSubmitted: boolean;
  public loginForm: FormGroup;
  public errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.add(cl);
    }
  }

  private initForm(): void {
    if (!environment.production) {
      this.loginForm = this.formBuilder.group({
        email: ['silvino_miranda@hotmail.com', [Validators.email, Validators.required]],
        password: ['p@ssw0rd123', [Validators.required, Validators.minLength(3)]]
      });
    } else {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)]]
      });
    }
  }

  public login(): void {
    this.auth.login(this.loginForm.value).then(() => {
      this.router.navigate(['/']);
    }).catch((reason: ErrorReason) => {
      if (reason.code === 'auth/invalid-email' || reason.code === 'auth/user-not-found') {
        this.errorMsg = 'Seu email não está em nenhum usuário, ou está incorreto!';
      } else if (reason.code === 'auth/wrong-password') {
        this.errorMsg = 'Sua senha está incorreta!';
      }

      return undefined;
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.remove(cl);
    }
  }

}
