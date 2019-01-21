import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from './../reducers';
import {
    AllCoursesLoaded,
    AllCoursesRequested,
    CourseActionTypes,
    CourseLoaded,
    CourseRequested,
    LessonsPageLoaded,
    LessonsPageRequested,
    LessonsPageCancelled,
} from './course.action';
import { allCoursesLoaded } from './course.selector';
import { CoursesService } from './services/courses.service';
import { throwError, of } from 'rxjs';

@Injectable()
export class CourseEffects {
    @Effect()
    loadCourses$ = this.action$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action =>
            this.coursesService.findCourseById(action.payload.courseId)
        ),
        map(course => new CourseLoaded({ course })),
        catchError(err => {
            console.error("error loading course ", err);
            return throwError(err);
        })
    );

    @Effect()
    loadAllCourses$ = this.action$.pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
        mergeMap(() => this.coursesService.findAllCourses()),
        map(courses => new AllCoursesLoaded({ courses })),
        catchError(err => {
            console.error("error loading all courses ", err);
            return throwError(err);
        })
    );

    @Effect()
    loadLessonsPage$ = this.action$.pipe(
        ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
        mergeMap(({ payload }) =>
            this.coursesService
                .findLessons(
                    payload.courseId,
                    payload.page.pageIndex,
                    payload.page.pageSize
                )
                .pipe(
                    catchError(err => {
                        console.error("error loading all lessons ", err);

                        this.store.dispatch(new LessonsPageCancelled());

                        return of([]);
                    })
                )
        ),
        map(lessons => new LessonsPageLoaded({ lessons }))
    );

    constructor(
        private action$: Actions,
        private coursesService: CoursesService,
        private store: Store<AppState>
    ) {}
}
