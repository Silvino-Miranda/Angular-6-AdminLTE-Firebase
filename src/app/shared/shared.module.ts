/**
 * Arquivo de configuração do módulo compartilhado.
 *
 * @author Márcio Casale de Souza <contato@kazale.com>
 * @since 0.0.3
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KzCepPipe } from './pipes/kz-cep.pipe';
import { KzCpfPipe } from './pipes/kz-cpf.pipe';
import { KzCnpjPipe } from './pipes/kz-cnpj.pipe';
import { KzCpfCnpjPipe } from './pipes/kz-cpf-cnpj.pipe';
import { KzFonePipe } from './pipes/kz-fone.pipe';
import { KzCpfValidatorDirective } from './directives/kz-cpf.directive';
import { KzCnpjValidatorDirective } from './directives/kz-cnpj.directive';
import { KzCpfCnpjValidatorDirective } from './directives/kz-cpf-cnpj.directive';
import { ModalUtilComponent } from './utils/modal-util.component';
import { KzPaginacaoComponent } from './components/kz-paginacao/kz-paginacao.component';
import { KzMaskDirective } from './directives/masked-input/kz-mask.directive';
import { KzMaskCurrencyDirective } from './directives/masked-input/kz-mask-currency.directive';
import { KzPikadayDirective } from './directives/kz-pikaday.directive';
import { RouterLinkStubDirective } from './testing/router-link-stub.directive';
import { InputComponent } from './input/input.component';

@NgModule({
  imports:      [ 
  	CommonModule,
  	FormsModule 
  ],
  declarations: [ 
  	KzCepPipe,
  	KzCpfPipe,
  	KzCnpjPipe,
    KzCpfCnpjPipe,
    KzFonePipe,
  	KzCpfValidatorDirective,
  	KzCnpjValidatorDirective, 
    KzCpfCnpjValidatorDirective,
    RouterLinkStubDirective,
    ModalUtilComponent,
  	KzPaginacaoComponent,
    KzMaskDirective,
    KzMaskCurrencyDirective,
    KzPikadayDirective,
    InputComponent
  ],
  exports: [ 
  	KzCepPipe,
  	KzCpfPipe,
  	KzCnpjPipe,
    KzCpfCnpjPipe,
    KzFonePipe,
  	KzCpfValidatorDirective,
    KzCnpjValidatorDirective, 
  	KzCpfCnpjValidatorDirective,
  	ModalUtilComponent,
  	KzPaginacaoComponent,
    KzMaskDirective,
    KzMaskCurrencyDirective,
    KzPikadayDirective,
    InputComponent,
    CommonModule, 
    FormsModule
  ]
})
export class SharedModule {}