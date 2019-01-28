import { NgModule } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

// Route Guards
import { NivelDevGuard } from '../route-guards/niveldev.guard';
import { LoggedInGuard } from '../route-guards/loggedin.guard';
import { LoggedOutGuard } from '../route-guards/loggedout.guard';
import { LeaveGuard } from '../route-guards/leave.guard';

// Serviços
//import { LoginService } from '../login/login.service';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from 'app/pages/usuario/usuario.service';
import { CidadesService } from '../../pages/cidades/cidades.service';

@NgModule({
    providers: [
        AngularFireAuth,
        AuthService,
		UsuarioService,
        LoggedInGuard,
        LoggedOutGuard,
        NivelDevGuard,
        LeaveGuard,
		CidadesService
    ]
})
export class CoreModule { }
