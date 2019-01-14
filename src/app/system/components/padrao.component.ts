import { OnInit } from "@angular/core";

import { configuration } from "app/configuration";
import { Usuario } from "app/models/usuario.modal";
import { UF } from "app/models/shared/ufs.model";


export class PadraoComponent implements OnInit {
    public urlRoute: string;
    public VUFs: UF[];
    public keyToDelete: string;
    public EstaAlterando: boolean = false;

    public UsuarioAtual: Usuario;

    public NameProjeto = configuration.projectName.firstName
        + ' ' + configuration.projectName.lastName;

    constructor(private databaseService?: any) {
        if (databaseService) {
            this.urlRoute = '/' + this.databaseService.getUrl();
            this.VUFs = this.databaseService.getUFs();
        }
    }

    ngOnInit() {
        
    }

}