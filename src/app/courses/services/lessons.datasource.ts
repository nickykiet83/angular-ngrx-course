import { PageQuery, LessonsPageRequested } from './../course.action';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

import { Lesson } from '../model/lesson';
import { AppState } from './../../reducers';
import { selectLessonsPage } from '../course.selector';
import { tap, catchError } from 'rxjs/operators';

export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    private unsubscribe: Subscription;

    constructor(private store: Store<AppState>) {
        this.unsubscribe = this.lessonsSubject.subscribe();
    }

    loadLessons(courseId: number, page: PageQuery) {
        this.unsubscribe.unsubscribe();
        this.store
            .pipe(
                select(selectLessonsPage(courseId, page)),
                tap(lessons => {

                    if (lessons.length > 0) {
                        this.lessonsSubject.next(lessons);
                    } else {
                        this.store.dispatch(new LessonsPageRequested({courseId, page}));
                    }
                }),
                catchError(err => of([]))
            ).subscribe();

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }
}
