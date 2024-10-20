import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { Unsubscriber, untilCmpDestroyed } from "@shared/decorator";
import { CONSTANTS } from "@shared/router-constants";
import { BCButtonComponent } from "@shared/components/bc-button/bc-button.component";
import { BCDividerComponent } from "@shared/components/bc-divider/bc-divider.component";
import { BCPasswordFieldComponent } from "@shared/components/bc-fields/bc-password-field/bc-password-field.component";
import { BCTextFieldComponent } from "@shared/components/bc-fields/bc-text-field/bc-text-field.component";
import { TokenService } from "@components/main/services/token.service";
import { BackendConfigService, IBackendConfig } from "@components/main/services/backend-config.service";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@Unsubscriber()
@Component({
    standalone: true,
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: [ './login-page.component.scss' ],
    imports: [
        FormsModule, BCButtonComponent, BCPasswordFieldComponent,
        BCTextFieldComponent, ReactiveFormsModule, BCDividerComponent,
        SignInComponent, SignUpComponent
    ],
})
export class LoginPageComponent implements OnInit {

    public isSignUp: boolean;

    /**
     * @constructor
     */
    constructor(
        private _tokenService: TokenService,
        private _backendConfigService: BackendConfigService,
        private _router: Router,
    ) {}

    ngOnInit(): void {
        if ( this._tokenService.token ) {
            this._router.navigate(['/']);
            return;
        }
    }

    /**
     * @return {void}
     */
    public nextPage() {
        this._backendConfigService.getBackendConfig()
        .pipe( untilCmpDestroyed( this ) )
        .subscribe( ( config: IBackendConfig ) => {
            this._backendConfigService.backendConfig$.next( config );
            this._router.navigate([ CONSTANTS.MAIN.route ]);
        } );
    }

}