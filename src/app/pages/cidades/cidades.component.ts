import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioService } from '../usuario/usuario.service';
import { CidadesService } from './cidades.service';
import { AuthService } from '../../providers/services/auth.service';

import { PadraoComponent } from 'app/system/components/padrao.component';
import { Cidade } from '../../models/cidade.modal';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.scss']
})
export class CidadesComponent extends PadraoComponent implements OnInit {
  allCidade: Cidade[];

  constructor(
    private dbService: CidadesService,
    private auth: AuthService,
    private user: UsuarioService,
    public router: Router,
    private toastrService: ToastrService, private Auth: AuthService) {
    super(dbService);

    this.UsuarioAtual = this.Auth.getUsuario();
  }

  ngOnInit() {
    this.dbService.getData()
      .subscribe((cidadeList: Cidade[]) => {
        this.allCidade = cidadeList;
      });
  }

  onEdit(cidade: Cidade) {
    this.dbService.sAny = cidade;
    this.router.navigate([this.urlRoute + '/edit']);
  }

  onDelete() {
    this.dbService.delete(this.keyToDelete).then(() => {
      this.toastrService.warning('Uma cidade foi deletada!', this.NameProjeto)
    });
  }

}
