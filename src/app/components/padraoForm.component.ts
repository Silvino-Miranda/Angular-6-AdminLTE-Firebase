import { OnInit } from "@angular/core";

import { configuration } from "../configuration";

import { Usuario } from "../models/usuario.modal";
import { AuthService } from "../providers/services/auth.service";

export class PadraoFormComponent implements OnInit {
  public urlRoute: string;
  public EstaAlterando: boolean = false;
  public LoggedUser: Usuario;

  public PName = configuration.projectName.firstName
    + ' ' + configuration.projectName.lastName;

  public canShow: boolean = true;

  constructor(private databaseService: any, auth: AuthService) {
    this.LoggedUser = auth.getUsuario();

    if (databaseService) {
      this.urlRoute = '/' + this.databaseService.getUrl();
    }
  }

  ngOnInit() {

  }

}
