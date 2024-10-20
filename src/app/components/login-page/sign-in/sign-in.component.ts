import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule,
    ReactiveFormsModule, Validators,
} from "@angular/forms";

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { TokenService } from "@components/main/services/token.service";
import { IUser, UserService } from "@components/main/services/user.service";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCDividerComponent } from "@shared/components/bc-divider/bc-divider.component";
import { BCPasswordFieldComponent } from "@shared/components/bc-fields/bc-password-field/bc-password-field.component";
import { BCTextFieldComponent } from "@shared/components/bc-fields/bc-text-field/bc-text-field.component";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
    imports: [
        FormsModule, BCButtonComponent, BCPasswordFieldComponent,
        BCTextFieldComponent, ReactiveFormsModule, BCDividerComponent,
    ],
})
export class SignInComponent implements OnInit {

    @Output() public signInSuccessEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() public signUpEvent: EventEmitter<void> = new EventEmitter<void>();

    get disabledSignInBtn(): boolean { return this.formGroup?.invalid; }
    get emailControl(): any { return this.formGroup?.get( 'email' ) }
    get passwordControl(): any { return this.formGroup?.get( 'password' ) }

    public formGroup: FormGroup;

    /**
     * @constructor
     */
    constructor(
        private _fb: FormBuilder,
        private _userService: UserService,
        private _tokenService: TokenService,
    ) {}

    /**
     * @constructor
     */
    ngOnInit(): void {
        this.formGroup = this._fb.group({
            email: [ '', Validators.required ],
            password: [ '', Validators.required ],
        });
    }

    /**
     * @return {void}
     */
    public signIn() {
        this._userService.login( this.formGroup.getRawValue() )
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( user: IUser ) => {
            this._userService.user$.next( user );
            this._tokenService.token$.next( user.token );
            localStorage.setItem( 'genAIToken', user.token );
            this.signInSuccessEvent.emit();
        } );
    }

}