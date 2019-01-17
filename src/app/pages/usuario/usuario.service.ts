import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { Usuario } from '../../models/usuario.modal';
import { UF, Ufs } from '../../models/shared/ufs.model';
import { PadraoService } from 'app/system/components/padrao.service';

@Injectable()
export class UsuarioService extends PadraoService<Usuario>{
  users: Observable<Usuario[]>;
  sUser: Usuario;

  constructor(private afb: AngularFireDatabase) {
    super(afb, 'usuario', 'Usuario');
    this.users = this.afb.list<Usuario>(`usuario`).valueChanges();
  }

  // create(user: Usuario): Promise<void> {
  //   return this.afb.object<Usuario>(`usuario/${user.uid}`).set(user);
  // }

  editUser(user: Usuario): Promise<void> {
    return this.afb.object<Usuario>(`usuario/${user.uid}`).set(user);
  }

  // getUserEmpresa(user: Usuario) {
  //   return this.empresaService.getByKey(user.key_empresa);
  // }

  getByUID(uid: string): Observable<Usuario> {
    let act = this.afb.object<Usuario>(`usuario/${uid}`).valueChanges();

    return act;
  }

  getByUIDPromise(uid: string): Promise<Usuario> {
    let act = this.getByUID(uid);

    return new Promise<Usuario>(resolve => {
      act.subscribe(user => {
        resolve(user);
      });
    });
  }

  getUFs(): UF[] {
    let VUfs: UF[] = Ufs;
    return VUfs;
  }
}
