import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';


import { UsuarioService } from './usuario.service';
import { Usuario } from '../../models/usuario.modal';
import { AuthService } from '../../providers/services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  LoggedUser: Usuario;

  constructor(
    public usuarioService: UsuarioService,
    private auth: AuthService,
    private router: Router
  ) { 
    this.LoggedUser = this.auth.getUsuario();
  }

  ngOnInit() {
  }

  onEdit(user: Usuario) {
    this.usuarioService.sUser = user;

    this.router.navigate(['/usuario/edit']);
  }

}
