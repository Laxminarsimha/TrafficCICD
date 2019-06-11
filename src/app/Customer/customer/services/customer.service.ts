import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Customer, Address, CustomerBillingRevenue, IRevenueAssignments, IRevenueTypes, ICodeValueOptions } from '../model/customer.model';
import { CustomerConstants } from '../customer.constants';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'userid': '1'
  })
};
@Injectable({ providedIn: 'root' })
export class CustomerService {
  public customerConstants: CustomerConstants;
  constructor(private http: HttpClient) {
    this.customerConstants = new CustomerConstants();
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
  public getCustomer(model: Customer) {
    return this.http.post(this.customerConstants.constants.urlLinks.customerUrl, model);
  };
  public getAllCustomer() {
    return this.http.post(this.customerConstants.constants.urlLinks.advertiserUrl, httpOptions);
  };
  public InsertCustomer(Customermodel: Customer) {
    return this.http.post(this.customerConstants.constants.urlLinks.insertCustomer, Customermodel);
  };
  public getCustomerType() {
    return this.http.get(this.customerConstants.constants.urlLinks.customerTypes);
  };

  public updateCustomer(Customermodel: Customer) {
    return this.http.post(this.customerConstants.constants.urlLinks.updateCustomer, Customermodel);
  };

  public getPhoneTypes() {
    return this.http.get(this.customerConstants.constants.urlLinks.phoneTypeList);
  };
  public InsertAddress(AddressModel: Address) {
    return this.http.post(this.customerConstants.constants.urlLinks.insertAddress, AddressModel);
  }

  //RevenueTypes
  public getRevenueType() {
    return [
      { revenueTypeId: 1, revenueTypeName: 'Local–Political' },
      { revenueTypeId: 2, revenueTypeName: 'National–Political' },
      { revenueTypeId: 3, revenueTypeName: 'Local-Direct' },
      { revenueTypeId: 4, revenueTypeName: 'National-Direct' },
      { revenueTypeId: 5, revenueTypeName: 'Local-Sports' },
      { revenueTypeId: 6, revenueTypeName: 'National-Sports' }
    ];
  };

  public getRevenueAssignments(): IRevenueAssignments[] {
    return this.customerConstants.constants.revenueAssignments
  };

  public InsertCustomerBillingRevenue(customerbillingModel: CustomerBillingRevenue) {
    return this.http.post(this.customerConstants.constants.urlLinks.insertCustomerBilling, customerbillingModel);
  }
  public codeValueOptions() {
    return this.http.get(this.customerConstants.constants.urlLinks.codeValueOptionsUrl);
  };
}