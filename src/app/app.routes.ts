import { Routes } from '@angular/router';

import { CONSTANTS } from '@shared/router-constants';

export const routes: Routes = [
    {
        path: '',
        redirectTo: CONSTANTS.MAIN.route,
        pathMatch: 'full',
    },
    {
        path: CONSTANTS.MAIN.route,
        loadComponent: () => import( '@components/main/main.component' ).then( (m) => m.MainComponent ),
        data: {
            title: CONSTANTS.MAIN.title,
        },
    },
];
