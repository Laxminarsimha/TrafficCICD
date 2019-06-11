
import { Injectable, EventEmitter } from '@angular/core';
import { debounceTime, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SaveDataService {
    public changedData: any[];
    private debounceTime: number;
    private subject = new BehaviorSubject<any>([]);
    public observableChange = new BehaviorSubject<any>([]);

    private sDataKey: string;
    public observableObject;
    constructor() {
        this.changedData = [];
        this.debounceTime = 700;
    }
    instantiateSubject() {
        this.subject.pipe(
            debounceTime(this.debounceTime)
        ).subscribe((data: any[]) => {
            if (data && data.length) {
                this.observableChange.next(data);
            }
        })
    }
    setChangedData(rowObject) {
        const sRecordIndex = this.isRecordFound(rowObject);
        if (sRecordIndex !== -1) {
            this.changedData.splice(sRecordIndex, 1, rowObject)
        }
        else {
            this.changedData.push(rowObject);
        }
        this.subject.next(JSON.parse(JSON.stringify(this.changedData)));
    }
    isRecordFound(rowdata) {
        return this.changedData.findIndex(oData => oData[this.sDataKey] === rowdata[this.sDataKey]);
    }
    getChangedData() {
        return this.changedData || [];
    }
    update(message: any) {
        this.subject.next({ text: message });
    }
    clearEvents() {
        // this.subject.next();
    }
    setDataKey(keyField) {
        this.sDataKey = keyField || '';
    }
    getDataKey() {
        return this.sDataKey;
    }
    setDebounceTime(value: number) {
        this.debounceTime = value || 700;
        this.instantiateSubject();
    }
    getEvents(): Observable<any> {
        return this.subject.asObservable();
    }
}