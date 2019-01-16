import { AuthActionTypes } from './../auth/auth.actions';
import { User } from './../model/user.model';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

export interface AuthState {
    loggedIn: boolean;
    user: User;
}

export interface AppState {
    auth: AuthState;
}

function authReducer(state: AuthState, action): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginAction:
            return {
                loggedIn: true,
                user: action.payload.user
            };
        case AuthActionTypes.LogoutAction:
            break;
        default:
            return state;
    }
    return state;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
