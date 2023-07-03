import { AbstractControl, ValidationErrors } from '@angular/forms';

export class noSpace {
  static noSpaceValidations(control: AbstractControl): ValidationErrors | null {
    let controlAbstract = control.value as string;

    // console.log(controlAbstract);
    if (controlAbstract?.indexOf(' ') > 0) {
      return { noSpaceValidator: true };
    } else {
      return null;
    }
  }
}
