import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { CopyHeader, CopyCreative, CopyItemUsageDTO } from '../model/copyinstructions.model';
import { copyInstructionUtilsService } from "../utils/copyInstructionUtils";
import { Library } from "@fortawesome/fontawesome-svg-core";
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'userid': '1'
  })
};

@Injectable({ providedIn: 'root' })
export class CopyItemService {

  constructor(private http: HttpClient, private _util: copyInstructionUtilsService) { }

  public SaveCopyInstructionService(model: Array<CopyCreative>) {
    return this.http.post(this._util.saveCopyInstructionsUrl, model);
  };

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
}