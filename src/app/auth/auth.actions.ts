import { User } from './../model/user.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LoginAction = '[Login] Action',
    LogoutAction = '[Logout] Action',
}

export class Login implements Action {
    readonly type = AuthActionTypes.LoginAction;

    constructor(public payload: {user: User}) {}

}

export type AuthActions = Login;
