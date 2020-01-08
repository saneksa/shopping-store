
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface RegistrationParams {
    login: string;
    name: string;
    email: string;
    password: string;
}

export interface IMutation {
    registration(params?: RegistrationParams): boolean | Promise<boolean>;
}

export interface IQuery {
    login(): string | Promise<string>;
}
