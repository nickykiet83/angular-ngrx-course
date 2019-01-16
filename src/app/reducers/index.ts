import { AuthState } from './../auth/auth.reducer';
import { AuthActionTypes } from './../auth/auth.actions';
import { User } from './../model/user.model';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import { routerReducer } from '@ngrx/router-store';


export interface AppState {
    // auth: AuthState;
}


export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [storeFreeze] : [];
