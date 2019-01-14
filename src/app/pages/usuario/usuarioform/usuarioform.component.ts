import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { User } from 'firebase';

import { PadraoComponent } from 'app/system/components/padrao.component';

import { UF } from '../../../models/shared/ufs.model';
import { AuthService } from '../../../providers/services/auth.service';
import { UserService } from '../../../providers/services/user.service';

import { Usuario } from '../../../models/usuario.modal';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.scss']
})
export class UsuarioformComponent implements OnInit {
  VUFs: UF[];
  VFormGroup: FormGroup;
  LoggedUser: Usuario;

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public router: Router,
    private toastrService: ToastrService,
    public authService: AuthService
  ) {
    this.LoggedUser = this.authService.getUsuario();

    if (typeof this.userService.sUser !== 'undefined') {
      this.VFormGroup = formBuilder.group({
        nome_completo: ['', [Validators.required]],
        fantasia: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        rg: ['', [Validators.required]],
        url_foto: [''],
        fixo: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        nivelacesso: [''],
        endereco: formBuilder.group({
          uf: [''],
          cidade: [''],
          bairro: [''],
          logradouro: [''],
          numero: ['']
        })
      });
    } else {
      this.VFormGroup = formBuilder.group({
        nome_completo: ['', [Validators.required]],
        fantasia: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        rg: ['', [Validators.required]],
        url_foto: [''],
        fixo: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        nivelacesso: [''],
        endereco: formBuilder.group({
          uf: [''],
          cidade: [''],
          bairro: [''],
          logradouro: [''],
          numero: ['']
        })
      });
    }
  }

  ngOnInit() {
    this.VUFs = this.userService.getUFs();

    if (typeof this.userService.sUser !== 'undefined') {
      let sUser: Usuario = this.userService.sUser;

      this.VFormGroup.setValue({
        nome_completo: sUser.nome_completo,
        fantasia: sUser.fantasia,
        cpf: sUser.cpf,
        rg: sUser.rg,
        url_foto: sUser.url_foto,
        fixo: sUser.fixo,
        celular: sUser.celular,
        nivelacesso: sUser.nivelacesso,
        endereco: {
          uf: sUser.endereco.uf,
          cidade: sUser.endereco.cidade,
          bairro: sUser.endereco.bairro,
          logradouro: sUser.endereco.logradouro,
          numero: sUser.endereco.numero
        }
      });
    }
  }

  onFormSubmit() {
    let valorform = this.VFormGroup.value;

    valorform.nome_completo = valorform.nome_completo.toUpperCase();
    valorform.fantasia = valorform.fantasia.toUpperCase();
    valorform.endereco.uf = valorform.endereco.uf.toUpperCase();
    valorform.endereco.cidade = valorform.endereco.cidade.toUpperCase();
    valorform.endereco.bairro = valorform.endereco.bairro.toUpperCase();
    valorform.endereco.logradouro = valorform.endereco.logradouro.toUpperCase();

    if (typeof this.userService.sUser === 'undefined') {
      this.authService.createAuthUser({ email: valorform.email, password: valorform.senha }).then(authState => {
        valorform.senha = '';
        if (this.authService.getUsuario().key_empresa === 'undefined') {
          valorform.key_empresa = '-LFtq8IvJX4H9uJh_BeH';
        } else {
          valorform.key_empresa = this.authService.getUsuario().key_empresa;
        }
        valorform.uid = authState.user.uid;

        this.userService.create(valorform)
          .then(() => {
            this.authService.login({ email: this.LoggedUser.email, password: this.LoggedUser.senha }).then(() => {
              this.goBack();

              this.toastrService.success('Usuário criado com sucesso!', 'BUS Ticket');
            });
          });
      });
    } else {
      this.userService.editUser({
        celular: valorform.celular,
        cpf: valorform.cpf,
        email: this.userService.sUser.email,
        senha: this.userService.sUser.senha,
        endereco: valorform.endereco,
        fantasia: valorform.fantasia,
        fixo: valorform.fixo,
        key_empresa: this.userService.sUser.key_empresa,
        nome_completo: valorform.nome_completo,
        rg: valorform.rg,
        nivelacesso: valorform.nivelacesso,
        uid: this.userService.sUser.uid,
        url_foto: valorform.url_foto
      }).then(() => {
        this.goBack();

        this.toastrService.success('Usuário editado com sucesso!', 'BUS Ticket');
      });
    }
  }

  goBack() {
    this.VFormGroup.reset();
    delete this.userService.sUser;
    this.router.navigate(['usuario']);
  }
}
