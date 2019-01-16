import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from '../reducers';
import { AuthModule } from './auth.module';
import { isLoggedIn } from './auth.selectors';

@Injectable({
    providedIn: AuthModule
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigateByUrl('/login');
                }
            })
        );

    }
}
