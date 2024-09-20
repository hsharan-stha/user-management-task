import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function userNameValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{

    const value= control.value;

    if(!value){
      return null
    }

    const userNameRegex=/^[a-z0-9_.]+$/.test(value);

    return !userNameRegex?{inValidUsername:true}:null;
  }
}
