import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import _ from 'lodash';

type IObject<T> = Record<string, T>;

const ERROR_MESSAGE: IObject<string> = {
    required: 'Your input is empty',
    email: 'Invalid Email',
    number: 'Value must be a number'
};

@Pipe({ name: "formControlErrorMsg", standalone: true })
export class FormControlErrorMsgPipe implements PipeTransform {

    /**
     * @param {ValidationErrors | null | undefined} errors
     * @return {string}
     */
    transform( errors: ValidationErrors | null | undefined ): string {
        const errorCode: string[] = _.keys( errors );

        return errorCode.length
            ? ERROR_MESSAGE[ errorCode[ 0 ] ]
            : '';
    }
}