import { CourseActions } from './course.action';
import { Lesson } from './model/lesson';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface LessonsState extends EntityState<Lesson> {
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>();

const intialLessonsState = adapter.getInitialState();

export function lessonsReducer(state = intialLessonsState, action: CourseActions): LessonsState {

    switch (action.type) {
        default:
            return state;
    }
}


export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
