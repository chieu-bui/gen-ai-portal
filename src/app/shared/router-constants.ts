export interface IRoute {
    route: string;
    title?: string;
    icon?: string;
};

export const CONSTANTS: IObject<IRoute> = {
    MAIN: { route: 'main', title: 'Main' },
    LOGIN: { route: 'login', title: 'Log In' },
};