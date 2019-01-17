import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { CourseActionTypes, CourseLoaded, CourseRequested } from './course.action';
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

    constructor(private action$: Actions, private coursesService: CoursesService) {}
}
