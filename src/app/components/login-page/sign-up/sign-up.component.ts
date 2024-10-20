import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule,
    ReactiveFormsModule, Validators,
} from "@angular/forms";

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCDividerComponent } from "@shared/components/bc-divider/bc-divider.component";
import { BCPasswordFieldComponent } from "@shared/components/bc-fields/bc-password-field/bc-password-field.component";
import { BCTextFieldComponent } from "@shared/components/bc-fields/bc-text-field/bc-text-field.component";
import { IUser, UserService } from "@components/main/services/user.service";
import { TokenService } from "@components/main/services/token.service";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ],
    imports: [
        FormsModule, BCButtonComponent, BCPasswordFieldComponent,
        BCTextFieldComponent, ReactiveFormsModule, BCDividerComponent,
    ],
})
export class SignUpComponent implements OnInit {

    @Output() public backEvent: EventEmitter<void> = new EventEmitter<void>();

    get disabledSignUpBtn(): boolean { return this.formGroup?.invalid }
    get emailControl(): any { return this.formGroup?.get( 'email' ) }
    get passwordControl(): any { return this.formGroup?.get( 'password' ) }
    get nameControl(): any { return this.formGroup?.get( 'name' ) }

    public formGroup: FormGroup;

    /**
     * @constructor
     * @param {FormBuilder} _fb
     * @param {UserService} _userService
     * @param {TokenService} _tokenService
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
            name: [ '', Validators.required ],
        });
    }

    /**
     * @return {void}
     */
    public signUp() {
        const data: { email: string, password: string, name: string, profile_image_url: string } = this.formGroup.getRawValue();
        data.profile_image_url = this._generateInitialsImage( data.name );

        this._userService.signUp( data )
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( user: IUser ) => {
            this._userService.user$.next( user );
            this._tokenService.token$.next( user.token );
            localStorage.setItem( 'genAIToken', user.token );
            this.backEvent.emit();
        } );
    }
    
    /**
     * @param {string} name
     * @return {void}
     */
    private _generateInitialsImage( name: string ) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
    
        if (!this._canvasPixelTest()) {
            console.log(
                'generateInitialsImage: failed pixel test, fingerprint evasion is likely. Using default image.'
            );
            return '/user.png';
        }
    
        ctx.fillStyle = '#F39C12';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '40px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        const sanitizedName = name.trim();
        const initials =
            sanitizedName.length > 0
                ? sanitizedName[0] +
                    (sanitizedName.split(' ').length > 1
                        ? sanitizedName[sanitizedName.lastIndexOf(' ') + 1]
                        : '')
                : '';
    
        ctx.fillText(initials.toUpperCase(), canvas.width / 2, canvas.height / 2);
    
        return canvas.toDataURL();
    }

    /**
     * @return {void}
     */
    private _canvasPixelTest = () => {
        // Test a 1x1 pixel to potentially identify browser/plugin fingerprint blocking or spoofing
        // Inspiration: https://github.com/kkapsner/CanvasBlocker/blob/master/test/detectionTest.js
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = 1;
        canvas.width = 1;
        const imageData = new ImageData(canvas.width, canvas.height);
        const pixelValues = imageData.data;
    
        // Generate RGB test data
        for (let i = 0; i < imageData.data.length; i += 1) {
            if (i % 4 !== 3) {
                pixelValues[i] = Math.floor(256 * Math.random());
            } else {
                pixelValues[i] = 255;
            }
        }
    
        ctx.putImageData(imageData, 0, 0);
        const p = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
        // Read RGB data and fail if unmatched
        for (let i = 0; i < p.length; i += 1) {
            if (p[i] !== pixelValues[i]) {
                console.log(
                    'canvasPixelTest: Wrong canvas pixel RGB value detected:',
                    p[i],
                    'at:',
                    i,
                    'expected:',
                    pixelValues[i]
                );
                console.log('canvasPixelTest: Canvas blocking or spoofing is likely');
                return false;
            }
        }
    
        return true;
    };

}