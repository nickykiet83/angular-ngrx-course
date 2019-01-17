import { CourseActions } from './course.action';
import { Lesson } from './model/lesson';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface LessonsState extends EntityState<Lesson> {
}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
    const compare = l1.courseId - l2.courseId;

    if (compare !== 0) {
        return compare;
    } else {
        return l1.seqNo - l2.seqNo;
    }
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndSeqNo
});

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
