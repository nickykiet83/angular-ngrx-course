import { AuthState } from './../auth/auth.reducer';
import { AuthActionTypes } from './../auth/auth.actions';
import { User } from './../model/user.model';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';


export interface AppState {
    auth: AuthState;
}


export const reducers: ActionReducerMap<AppState> = {
};


export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [storeFreeze] : [];
