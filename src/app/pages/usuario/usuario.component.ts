import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../../providers/services/user.service';

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
    public userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { 
    this.LoggedUser = this.auth.getUsuario();
  }

  ngOnInit() {
  }

  onEdit(user: Usuario) {
    this.userService.sUser = user;

    this.router.navigate(['/usuario/edit']);
  }

}
