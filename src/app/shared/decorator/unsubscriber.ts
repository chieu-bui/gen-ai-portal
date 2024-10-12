import { Subject, Observable, MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import _ from 'lodash';

export const DESTROY_CMP_SUBJECT_NAME: string = 'destroyed$';

export function destroyCmp<T = any>( instance: T, destroyMethodName?: string ) {
	const destroyed$: Subject<void> = ( instance as any )[ destroyMethodName || DESTROY_CMP_SUBJECT_NAME ];

	destroyed$?.next();
}

export function untilCmpDestroyed<T = any, U = any>( instance: T, destroyMethodName?: string ): MonoTypeOperatorFunction<U> {
	// eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
	return <U> ( source: Observable<U> ) => {
		const destroyed$: Subject<void> = ( instance as any )[ destroyMethodName || DESTROY_CMP_SUBJECT_NAME ] || new Subject<void>();

		if ( !destroyMethodName ) ( instance as any )[ DESTROY_CMP_SUBJECT_NAME ] = destroyed$;

		return source.pipe( takeUntil<U>( destroyed$ ) );
	};
}

export function Unsubscriber(): ClassDecorator {
	return ( target: (Function) ) => {
		const cmpOnDestroy: (() => void) | null = target.prototype.ngOnDestroy;

		target.prototype.ngOnDestroy = function() {
			this[ DESTROY_CMP_SUBJECT_NAME ]?.next();
			_.isFunction( cmpOnDestroy ) && cmpOnDestroy.apply( this );
		};
	};
}
