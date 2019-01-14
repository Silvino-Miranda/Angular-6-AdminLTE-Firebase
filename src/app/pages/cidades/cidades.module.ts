import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CidadesComponent } from './cidades.component';
import { CidadeformComponent } from './cidadeform/cidadeform.component';

import { LeaveGuard } from '../../providers/route-guards/leave.guard';

import { SharedModule } from 'app/system/shared/shared.module';

const ROUTES: Routes = [
    { path: '', component: CidadesComponent, canActivate: [] },
    { path: 'new', component: CidadeformComponent, canDeactivate: [LeaveGuard] },
    { path: 'edit', component: CidadeformComponent, canDeactivate: [LeaveGuard] }
];

@NgModule({
    declarations: [
        CidadesComponent,
        CidadeformComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule,
        ReactiveFormsModule
    ]
})
export class CidadesModule { }