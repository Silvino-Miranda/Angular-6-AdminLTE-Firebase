import { configuration } from '../../config/configuration';

import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../providers/services/auth.service';

import { Usuario } from '../../models/usuario.modal';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  public projectName: any = configuration.projectName;
  public userDefault: string = configuration.userDefaultImage;
  private classes: string[] = [configuration.skin, 'sidebar-mini'];
  user: Usuario;

  constructor(
    public router: Router,
    public auth: AuthService
  ) {
    this.user = this.auth.getUsuario();
  }

  ngOnInit() {
    $(document).ready(() => {
      const layout = $('body').data('lte.layout');
      if (layout) {
        layout.fix();
      }
      const trees: any = $('[data-widget="tree"]');
      if (trees) {
        trees.tree();
      }
    });
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.add(cl);
    }
  }

  isAcLevel(level: 1 | 2 | 3): boolean {
    return this.auth.getUsuario().nivelacesso >= level;
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    for (const cl of this.classes) {
      body.classList.remove(cl);
    }
  }

}
