import { AbstractControl } from "@angular/forms";

export class CustomDecorators {

    /**
     * Validate Number
     * @param {AbstractControl} control
     * @return {IObject}
     */
    public static ValidateNumber( control: AbstractControl ) : IObject<any>  {
        return /^[0-9]*$/.test(control.value) ? null : { number: true };
    }

}