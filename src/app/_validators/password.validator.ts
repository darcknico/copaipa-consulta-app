import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: FormControl): ValidationResult {
        if(!control.value){
            return null;
        }
        let hasNumber = /\d/.test(control.value);
        //let hasUpper = /[A-Z]/.test(control.value);
        //let hasLower = /[a-z]/.test(control.value);
        let hasLetter = /[a-zA-Z]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasLetter;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
}