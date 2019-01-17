import { allCoursesLoaded } from './course.selector';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, mergeMap, withLatestFrom, filter } from 'rxjs/operators';

import { AppState } from './../reducers';
import { AllCoursesLoaded, AllCoursesRequested, CourseActionTypes, CourseLoaded, CourseRequested } from './course.action';
import { CoursesService } from './services/courses.service';

@Injectable()
export class CourseEffects {
    @Effect()
    loadCourses$ = this.action$
        .pipe(
            ofType<CourseRequested>(CourseActionTypes.CourseRequested),
            mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
            map(course => new CourseLoaded({course})),
        );


    @Effect()
    loadAllCourses$ = this.action$
        .pipe(
            ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
            withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
            filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
            mergeMap(() => this.coursesService.findAllCourses()),
            map(courses => new AllCoursesLoaded({courses}))
        );

    constructor(private action$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}
}
