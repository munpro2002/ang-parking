import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.scss'],
})
export class FormReactiveComponent {
  form: any;
  inputName: any;
  inputEmail: any;
  inputDescription: any;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl(),
      description: new FormControl(),
    });

    this.inputName = this.form.controls.name;
    this.inputEmail = this.form.controls.email;
    this.inputDescription = this.form.controls.description;
  }
}
