import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password.component';

const ROUTES: Routes = [
    { path: '', component: ForgotPasswordComponent }
]

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule
    ]
})
export class ForgotPasswordModule { }