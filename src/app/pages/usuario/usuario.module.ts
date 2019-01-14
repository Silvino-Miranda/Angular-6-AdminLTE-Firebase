import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario.component';
import { UsuarioformComponent } from './usuarioform/usuarioform.component';

import { LeaveGuard } from '../../providers/route-guards/leave.guard';

import { SharedModule } from 'app/system/shared/shared.module';

const ROUTES: Routes = [
    { path: '', component: UsuarioComponent, canActivate: [] },
    { path: 'new', component: UsuarioformComponent, canDeactivate: [LeaveGuard] },
    { path: 'edit', component: UsuarioformComponent, canDeactivate: [LeaveGuard] }
];

@NgModule({
    declarations: [
        UsuarioComponent,
        UsuarioformComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule,
        ReactiveFormsModule
    ]
})
export class UsuarioModule { }