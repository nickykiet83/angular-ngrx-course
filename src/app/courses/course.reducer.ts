import { Course } from './model/course';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CoursesState extends EntityState<Course> {



}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();
