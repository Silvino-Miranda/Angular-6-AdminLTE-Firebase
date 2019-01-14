import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { configuration } from "app/configuration";

import { AuthService } from "app/providers/services/auth.service";

import { Usuario } from "app/models/usuario.modal";

export class PadraoListComponent<T> implements OnInit {
  urlRoute: string;
  keyToDelete: string;
  vList: T[];
  LoggedUser: Usuario;
  PName = configuration.projectName.firstName + ' ' + configuration.projectName.lastName;

  constructor(
    public databaseService: any,
    public router: Router,
    private tService: ToastrService,
    public auth: AuthService
  ) {
    this.urlRoute = '/' + this.databaseService.getUrl();

    this.LoggedUser = this.auth.getUsuario();
  }

  ngOnInit() {
    this.databaseService.getData('key_empresa', this.LoggedUser.key_empresa)
      .subscribe((vList: T[]) => {
        this.vList = vList;
      });
  }

  onEdit(pDados: T) {
    this.databaseService.sAny = pDados;
    this.router.navigate([this.urlRoute + '/edit']);
  }

  onDelete($key?: string) {
    if (typeof $key === 'undefined') {
      this.databaseService.delete(this.keyToDelete).then(() => {
        this.tService.warning('Um item foi deletado!', this.PName);
      });
    } else if (typeof $key !== 'undefined') {
      this.keyToDelete = $key;
    }
  }
}
