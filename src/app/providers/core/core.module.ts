import { NgModule } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

// Serviços
import { CidadesService } from '../../pages/cidades/cidades.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

// Route Guards
import { LoggedInGuard } from '../route-guards/loggedin.guard';
import { LoggedOutGuard } from '../route-guards/loggedout.guard';
import { LeaveGuard } from '../route-guards/leave.guard';

@NgModule({
    providers: [
        AngularFireAuth,
        AuthService,     
        UserService,
        CidadesService,    
        LoggedInGuard,
        LoggedOutGuard,
        LeaveGuard
    ]
})
export class CoreModule { }
