import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { OrderUtilsService } from '../utils/orderutils';
import { CustomerType, Customer} from '../model/order.model'
import { headersToString } from "selenium-webdriver/http";
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'userid': '1'
  })
};
@Injectable({ providedIn: 'root' })
export class OrderService {

    constructor(private http: HttpClient, private _util: OrderUtilsService) { }
  
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
 
  public getAllAdvertisers(customerTypeId)
   {
     return this.http.post(this._util.AllcustomerUrl,customerTypeId);
   }

   public getAllAgencies(customerTypeId)
   {
     return this.http.post(this._util.AllcustomerUrl,customerTypeId);
   }
   
   public getAllContacts()
   {
     return this.http.get(this._util.AllContactListUrl);
   }
 
   public getAddOrder(orderModel)
   {
     return this.http.post(this._util.AddOrderUrl,orderModel);
   }
  
   public getAddOrderAgency(orderAgencyModel)
   {
     return this.http.post(this._util.AddOrderUrl,orderAgencyModel);
   }

   public getOrderMaxId(){
    return this.http.get(this._util.GetMaxOrderId);
   }

  }