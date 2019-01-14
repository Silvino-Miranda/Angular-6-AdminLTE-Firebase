import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { PadraoService } from "app/system/components/padrao.service";
import { Cidade } from "../../models/cidade.modal";
import { DatabaseReference } from "angularfire2/database/interfaces";

@Injectable()
export class CidadesService extends PadraoService<Cidade> {

  Raiz: DatabaseReference;

  constructor(private firebase: AngularFireDatabase) {
    super(firebase, 'cidade');
  }

}
