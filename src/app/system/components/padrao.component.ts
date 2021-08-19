import { OnInit, Directive } from '@angular/core';

import { configuration } from 'app/config/configuration';
import { Usuario } from 'app/models/usuario.modal';
import { UF } from 'app/models/shared/ufs.model';


@Directive()
export class PadraoComponent implements OnInit {
    public urlRoute: string;
    public VUFs: UF[];
    public keyToDelete: string;
    public Nome_Tabela: string;
    public EstaAlterando = false;

    public UsuarioAtual: Usuario;

    public NameProjeto = configuration.projectName.firstName
        + ' ' + configuration.projectName.lastName;

    constructor(private databaseService?: any) {
        if (databaseService) {
            this.Nome_Tabela = this.databaseService.getNome_Tabela();
            this.urlRoute = '/' + this.databaseService.getUrl();
            this.VUFs = this.databaseService.getUFs();

        }
    }

    ngOnInit() {

    }

}
