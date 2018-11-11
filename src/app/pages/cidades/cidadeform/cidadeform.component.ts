import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PadraoComponent } from '../../../components/padrao.component';
import { UF } from '../../../models/shared/ufs.model';
import { CidadesService } from '../cidades.service';
import { AuthService } from '../../../providers/services/auth.service';

@Component({
  selector: 'app-cidadeform',
  templateUrl: './cidadeform.component.html',
  styleUrls: ['./cidadeform.component.scss']
})
export class CidadeformComponent extends PadraoComponent implements OnInit {

  VFormGroup: FormGroup;

  constructor(public dbService: CidadesService,
    private tostr: ToastrService,
    public formBuilder: FormBuilder, public router: Router, private auth: AuthService) {
    super(dbService);

    this.UsuarioAtual = this.auth.getUsuario();

    this.VFormGroup = formBuilder.group({
      nome_cidade: ['', [Validators.required]],
      uf: ['']
    });
  }

  ngOnInit() {
    if (this.dbService.sAny) {
      this.EstaAlterando = true;
      this.VFormGroup.setValue({
        nome_cidade: this.dbService.sAny.nome_cidade,
        uf: this.dbService.sAny.uf
      });
    }
  }

  onFormSubmit() {
    let valorform = this.VFormGroup.value;

    valorform.nome_cidade = valorform.nome_cidade.toUpperCase();
    valorform.uf = valorform.uf.toUpperCase();

    if (!this.dbService.sAny) {
      valorform.key_empresa = this.UsuarioAtual.key_empresa;
      this.dbService.create(valorform)
        .then(() => {
          this.goBack();
          this.tostr.success('Cidade criada com sucesso!', this.NameProjeto);
        });
    } else if (this.dbService.sAny) {
      valorform.$key = this.dbService.sAny.$key;
      valorform.key_empresa = this.dbService.sAny.key_empresa;

      this.dbService.update(valorform).then(() => {
        this.goBack();
        this.tostr.success('Cidade editada com sucesso!', this.NameProjeto);
      });
    }
  }

  goBack() {
    this.EstaAlterando = false;
    this.VFormGroup.reset();
    this.dbService.sAny = undefined;
    this.router.navigate([this.urlRoute]);
  }

}
