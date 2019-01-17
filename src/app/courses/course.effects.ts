import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { CourseActionTypes, CourseLoaded, CourseRequested, AllCoursesRequested, AllCoursesLoaded } from './course.action';
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
            mergeMap(action => this.coursesService.findAllCourses()),
            map(courses => new AllCoursesLoaded({courses}))
        );

    constructor(private action$: Actions, private coursesService: CoursesService) {}
}
