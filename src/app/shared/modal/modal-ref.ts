import { Subject } from 'rxjs';

export class ModalRef<T = unknown> {
    private readonly afterClosedSubject = new Subject<T | undefined>();
    public readonly afterClosed = this.afterClosedSubject.asObservable();

    constructor() {}

    public close(result?: T) {
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();
    }
}
