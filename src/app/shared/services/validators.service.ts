import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

import { FormPatterns } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public static emailPattern: string = FormPatterns.emailPattern;

  isInvalidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  // solo recibo los fields del form, pero NO el form. X eso retorno 1 cb()
  isFieldOneEqualFieldTwo(field1: string, field2: string) {
    // es abstractControl general, pero en si es 1 FormGroup
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      // como busco validar = pass, seteo el err en 1 field -- podemos implementar el switch para tener los messages para este error (notEqual)
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      // limpio el error previo cuando todo va bien
      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }
}
