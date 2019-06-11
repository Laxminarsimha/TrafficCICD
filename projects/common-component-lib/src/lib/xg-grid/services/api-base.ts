import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class xgAPIService {

    constructor(private client: HttpClient) { }

    get(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        return this.client.get(url, options);
    }

    post(url: string) { }
    put(url: string) { }
    patch(url: string) { }
    delete(url: string) { }


}