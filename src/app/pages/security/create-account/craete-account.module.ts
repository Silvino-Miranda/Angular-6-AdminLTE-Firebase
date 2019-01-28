import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CreateAccountComponent } from "./create-account.component";

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [
    RouterModule.forChild([{ path: "", component: CreateAccountComponent }]),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CreateAccountModule {}
