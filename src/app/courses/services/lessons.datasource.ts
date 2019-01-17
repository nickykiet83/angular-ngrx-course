import { PageQuery } from './../course.action';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { Lesson } from '../model/lesson';
import { AppState } from './../../reducers';

export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private store: Store<AppState>) {

    }

    loadLessons(courseId: number, page: PageQuery) {

        this.loadingSubject.next(true);


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

