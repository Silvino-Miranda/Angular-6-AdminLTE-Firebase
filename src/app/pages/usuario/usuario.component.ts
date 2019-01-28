import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from './usuario.service';

import { Usuario } from '../../models/usuario.modal';
import { AuthService } from '../../providers/services/auth.service';
import { PadraoComponent } from 'app/system/components/padrao.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent extends PadraoComponent implements OnInit {
  allUsuario: Usuario[];
  LoggedUser: Usuario;

  constructor(
    public dbService: UsuarioService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    super(dbService); 
    this.LoggedUser = this.authService.getUsuario();
  }

  ngOnInit() {
    this.dbService.getData()
      .subscribe(data => this.allUsuario = data);
  }

  onEdit(user: Usuario) {
    this.dbService.sUser = user;

    this.router.navigate(['/usuario/edit']);
  }

  onDelete() {
    this.dbService.delete(this.keyToDelete).then(() => {
     // this.authService.deleteUser();
      this.toastrService.warning(`Um ${this.Nome_Tabela} foi deletada!`, this.NameProjeto)
    });
  }

}
