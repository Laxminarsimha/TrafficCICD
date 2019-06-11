import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { CommercialUtilsService } from '../utils/CommercialUtils';
import { Commercial } from '../model/commercial.model';
import { ViewcreatecommercialConstants } from '../view-create-commercial.constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({ providedIn: 'root' })
export class ViewCommercialService {
  public viewcreatecommercialConstants: ViewcreatecommercialConstants;
  constructor(private http: HttpClient, private customerUtilService: CommercialUtilsService) {
    this.viewcreatecommercialConstants = new ViewcreatecommercialConstants();
  }
 


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


  public getCommercials(model: Commercial) {
    return this.http.post(this.viewcreatecommercialConstants.constants.urlLinks.viewcreatecommercialUrl, model);
  };

}