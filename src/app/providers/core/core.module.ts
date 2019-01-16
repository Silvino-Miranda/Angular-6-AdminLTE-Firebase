import { NgModule } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

// Route Guards
import { LoggedInGuard } from '../route-guards/loggedin.guard';
import { LoggedOutGuard } from '../route-guards/loggedout.guard';
import { LeaveGuard } from '../route-guards/leave.guard';

// Serviços
import { CidadesService } from '../../pages/cidades/cidades.service';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from 'app/pages/usuario/usuario.service';

@NgModule({
    providers: [
        AngularFireAuth,
        AuthService,     
        UsuarioService,
        CidadesService,    
        LoggedInGuard,
        LoggedOutGuard,
        LeaveGuard
    ]
})
export class CoreModule { }
