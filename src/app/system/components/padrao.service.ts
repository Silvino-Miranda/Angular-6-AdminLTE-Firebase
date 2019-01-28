import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, QueryFn } from 'angularfire2/database';
import { Observable, Observer } from 'rxjs';
import { take } from 'rxjs/Operators';
import { UF, Ufs } from 'app/models/shared/ufs.model';
import { Emissor, Emissores } from 'app/models/shared/Emissores.model';


@Injectable()
export class PadraoService<T> {
  anyList: AngularFireList<T>;
  anyListAll: T[];
  sAny: T;

  constructor(private fb: AngularFireDatabase,
    public urlRoute: string,
    public pNome_Tabela: string) {
    this.anyList = this.fb.list<any>(`${this.urlRoute}`);
  }

  getData(CampoOrderByChild?: string, pValue?: string, OrderBy?: string,  OrderBy2?: string): Observable<T[]> {
    if (CampoOrderByChild) {
      this.anyList = this.fb.list<any>(`${this.urlRoute}`,
        ref => ref.orderByChild(CampoOrderByChild).equalTo(pValue));
    } else {
      if (OrderBy) {
        this.anyList = this.fb.list<any>(`${this.urlRoute}`,
          ref => ref.orderByChild(OrderBy));
      } else {
        this.anyList = this.fb.list<any>(`${this.urlRoute}`);
      }
    }
    return Observable.create((observer: Observer<T[]>) => {
      this.anyList.snapshotChanges().subscribe(item => {
        this.anyListAll = [];

        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.anyListAll.push(y as T);
        });
        observer.next(this.anyListAll);
      });
    })
  }

  create(any: T) {
    delete any['$key'];
    return this.anyList.push(any);
  }

  update(any: T) {
    const $key = any['$key'];
    delete any['$key'];
    return this.anyList.update($key, any);
  }

  delete($key: string) {
    return this.anyList.remove($key);
  }

  getByKey($key: string): Observable<T> {
    return this.fb.object<T>(`${this.urlRoute}/${$key}`).valueChanges().pipe(take(1));
  }

  getRef(pQueryFn: QueryFn) {
    this.fb.list<any>(`${this.urlRoute}`, pQueryFn);
  }

  // Fucoes Extras
  getUrl(): string {
    return this.urlRoute;
  }

  getNome_Tabela(): string {
    return this.pNome_Tabela;
  }

  getUFs(): UF[] {
    const VUfs: UF[] = Ufs;
    return VUfs;
  }

  getEmissores(): Emissor[] {
    const VEmissores: Emissor[] = Emissores;
    return VEmissores;
  }
}
