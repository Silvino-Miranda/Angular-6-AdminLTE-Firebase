import { Injectable } from "@angular/core";

import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList, QueryFn } from "angularfire2/database";
import { Observable, Observer } from "rxjs";
import { take } from 'rxjs/Operators';
import { UF, Ufs } from "../models/shared/ufs.model";
import { Emissor, Emissores } from "../models/shared/Emissores.model";

@Injectable()
export class PadraoService<T> {
  anyList: AngularFireList<T>;
  anyListAll: T[];
  sAny: T;

  constructor(private fb: AngularFireDatabase, public urlRoute: string) {
    this.anyList = this.fb.list<any>(`${this.urlRoute}`);
  }

  getUrl(): string {
    return this.urlRoute;
  }

  getByKey($key: string): Observable<T> {
    return this.fb.object<T>(`${this.urlRoute}/${$key}`).valueChanges().pipe(take(1));
  }

  getRef(pQueryFn: QueryFn) {
    this.fb.list<any>(`${this.urlRoute}`, pQueryFn);
  }

  getData(CampoOrderByChild?: string, pValue?: string): Observable<T[]> {
    if (CampoOrderByChild) {
      this.anyList = this.fb.list<any>(`${this.urlRoute}`,
        ref => ref.orderByChild(CampoOrderByChild).equalTo(pValue));
    } else {
      this.anyList = this.fb.list<any>(`${this.urlRoute}`);
    }

    return Observable.create((observer: Observer<T[]>) => {
      this.anyList.snapshotChanges().subscribe(item => {
        this.anyListAll = [];

        item.forEach(element => {
          let y = element.payload.toJSON();
          y["$key"] = element.key;
          this.anyListAll.push(y as T);
        });

        observer.next(this.anyListAll);
      });
    })
  }

  create(any: T) {
    delete any["$key"];
    return this.anyList.push(any);
  }

  update(any: T) {
    let $key = any["$key"];
    delete any["$key"];
    return this.anyList.update($key, any);
  }

  delete($key: string) {
    return this.anyList.remove($key);
  }

  getUFs(): UF[] {
    let VUfs: UF[] = Ufs;
    return VUfs;
  }

  getEmissores(): Emissor[] {
    let VEmissores: Emissor[] = Emissores;
    return VEmissores;
  }
}
