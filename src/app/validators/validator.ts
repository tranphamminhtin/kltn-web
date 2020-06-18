import { AbstractControl } from "@angular/forms";

export function emailValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        if (control.value === '')
            return null;
        const result = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(control.value);
        if (!result) {
            return {
                format: true
            };
        }
    }
    return null;
}

export function confirmPassValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        if (control.value === '')
            return null;
        const password2 = control.value;
        const passwordControl = control.root.get('password');
        if (passwordControl) {
            const password = passwordControl.value;
            if (password !== password2) {
                return {
                    match: true
                };
            }
        }
    }
    return null;
}

export function onlyLetterValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        if (control.value === '')
            return null;
        const result = /[0-9]/.test(control.value);
        if (result) {
            return {
                format: true
            };
        }
    }
    return null;
}

export function numberPhoneValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        if (control.value === '')
            return null;
        const result = /^0[0-9]{9}$/.test(control.value);
        if (!result) {
            return {
                format: true
            };
        }
    }
    return null;
}

// export function onlyNumberValidator(control: AbstractControl) {
//     if (control && (control.value !== null || control.value !== undefined)) {
//         const result = /[0-9]*$/.test(control.value);
//         if (!result) {
//             return {
//                 format: true
//             };
//         }
//     }
//     return null;
// }