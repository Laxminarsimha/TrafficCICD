import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { LibraryHeader,LibraryType, LibraryItem } from '../models/library.model'
import { LibraryUtilsService } from "../utils/libraryUtils";
import { Library } from "@fortawesome/fontawesome-svg-core";
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'userid': '1'
  })
};

@Injectable({ providedIn: 'root' })
export class LibraryService {

  constructor(private http: HttpClient, private _util: LibraryUtilsService) { }



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


  public getLibrary(model: Library) {
    return this.http.post(this._util.libraryUrl, model);
  };

  public getAllLibrary() {
    return this.http.post(this._util.AlllibraryUrl, httpOptions);
  };
  public getLibrarys() {
    return this.http.get(this._util.AlllibraryUrl);
  };
  public GetAdvertisers() {
    return this.http.get(this._util.GetAdvertisers);
  };
  // InsertLibrary  

  public AddCommercial(Librarymodel: LibraryItem) {
    return this.http.post(this._util.AddCommercial, Librarymodel);
  };
  //GetLibrary


  public getLibraryType() {
    return this.http.get(this._util.GetLibraryTypeUrl);
    // return [{"LibraryTypeId":"1","LibraryTypeName":"Advertiser"},{"LibraryTypeId":"2","LibraryTypeName":"Agency"}]
  };

  public updateLibrary(Librarymodel: LibraryItem) {
    return this.http.post(this._util.UpdateLibrary, Librarymodel);
  };
}