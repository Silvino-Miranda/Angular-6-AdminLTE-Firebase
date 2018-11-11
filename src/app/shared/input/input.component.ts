import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'bus-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

  @Input() label: string
  @Input() errorMessage: string

  input: any

  @ContentChild(FormControlName) controlName: FormControlName;

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.input = this.controlName
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva FormControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }
  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
