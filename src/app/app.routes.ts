import { Routes } from '@angular/router';

import { DashComponent } from './parts/dash/dash.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/security/login/login.component';
import { LogoutComponent } from './pages/security/logout/logout.component';

// Route Guards
import { LoggedInGuard } from './providers/route-guards/loggedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forgot', loadChildren: './pages/security/forgot-password/forgot-password.module#ForgotPasswordModule' },
  { path: '', component: DashComponent, canActivate: [LoggedInGuard],
    children: [
      { path: 'main', component: MainComponent },     
      { path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioModule' },
      { path: 'cidade', loadChildren: './pages/cidades/cidades.module#CidadesModule' }
    ]
  }
];
