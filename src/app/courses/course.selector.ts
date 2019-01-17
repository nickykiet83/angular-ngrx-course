import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoursesState } from './course.reducer';

import * as fromCourse from './course.reducer';


export const selectCoursesState = createFeatureSelector<CoursesState>('courses');


export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    courseState => courseState.entities[courseId]
);


export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll
);
