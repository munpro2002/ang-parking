import { Component } from '@angular/core';

import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  onSubmit(f: NgForm) {
    console.log(f);
  }

  onChange(name: NgModel) {
    console.log(name);
  }
}
