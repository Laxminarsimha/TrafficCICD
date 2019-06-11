import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServiceUtilsService } from '../utils/ServiceUtils';
import { ChannelReferenceRequestEntity } from '../model/service.model';
const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        userid: '1'
    })
};

@Injectable({ providedIn: 'root' })
export class ServiceService {
    constructor(private http: HttpClient, private _util: ServiceUtilsService) {}

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    public saveService(postData: object) {
        return this.http.post(this._util.saveServiceURL, postData);
    }

    public getServiceType() {
        return this.http.get(this._util.getServiceTypeURL);
    }

    // public getMarketList(selectedSource: number): Observable<any> {
    //     return this.http.get(this._util.getMarketListURL + selectedSource);
    // }

    // public getChannelReferenceData(
    //     requestEntity: ChannelReferenceRequestEntity
    // ): Observable<any> {
    //     return this.http.post(
    //         this._util.getChannelReferenceDataURL,
    //         requestEntity
    //     );
    // }
}
