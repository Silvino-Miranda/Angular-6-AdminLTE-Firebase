import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UsuarioService } from './usuario.service';

import { Usuario } from '../../models/usuario.modal';
import { AuthService } from '../../providers/services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  allUsuario: Usuario[];
  LoggedUser: Usuario;

  constructor(
    public usuarioService: UsuarioService,
    private auth: AuthService,
    private router: Router
  ) { 
    this.LoggedUser = this.auth.getUsuario();
  }

  ngOnInit() {
    this.usuarioService.getData()
      .subscribe(data => this.allUsuario = data);
  }

  onEdit(user: Usuario) {
    this.usuarioService.sUser = user;

    this.router.navigate(['/usuario/edit']);
  }

}
