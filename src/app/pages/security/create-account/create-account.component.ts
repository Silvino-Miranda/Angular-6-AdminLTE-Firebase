import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from "app/pages/usuario/usuario.service";
import { AuthService } from "app/providers/services/auth.service";
import { configuration } from "app/config/configuration";
import { Usuario } from "app/models/usuario.modal";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"]
})
export class CreateAccountComponent implements OnInit {
  private classes = ['hold-transition', 'login-page'];
  public projectName = configuration.projectName;

  public createAccountForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.initForm();
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.add(cl);
    }
  }

  private initForm(): void {
    this.createAccountForm = this.formBuilder.group({
      nome_completo: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirm_password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async onCreateAccountSubmitButtonClicked() {
    let valorform = this.createAccountForm.value;
    let VUsuario: Usuario = new Usuario();

    if (typeof this.usuarioService.sUser === 'undefined') {
      this.authService.createAuthUser({ email: valorform.email, password: valorform.password }).then(authState => {
       // console.log('Usuario criado na Auth');

        VUsuario.nome_completo = valorform.nome_completo;
        VUsuario.email = valorform.email;
        VUsuario.uid = authState.user.uid;
        VUsuario.celular = '';
        VUsuario.cpf = '';
        VUsuario.endereco.bairro = '';
        VUsuario.endereco.cidade = '';
        VUsuario.endereco.logradouro = '';
        VUsuario.endereco.numero = '';
        VUsuario.endereco.uf = '';
        VUsuario.fantasia = '';
        VUsuario.fixo = '';
        VUsuario.nivelacesso = 1;
        VUsuario.rg = '';
        VUsuario.senha = '';

        this.usuarioService.createByUid(VUsuario).then(() => {
          //console.log('Usuario criado na base');
          
          this.authService.login({ email: valorform.email, password: valorform.password }).then(() => {
           // console.log('Login Feito');
            this.router.navigate(["/"]);
           // console.log('navegou para o Desh');            
          });
        });
      });
    }
  }
}
