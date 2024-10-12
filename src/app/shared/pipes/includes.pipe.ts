import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({ name: "includes", standalone: true })
export class IncludesPipe implements PipeTransform {

    /**
     * @param {any} value
     * @param {any[]} compares
     * @return {boolean}
     */
    transform( value: any, compares: any[] ): boolean {
        return _.includes( compares, value );
    }
}