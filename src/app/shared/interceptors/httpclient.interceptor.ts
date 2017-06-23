import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subscription } from "rxjs";


@Injectable()
export class HttpClient {

    public webApiUrl: string;
    public cache: any = {} // Hold GET requests from an API using the URL as a primary key

    constructor(
        private http: Http
    ) {
        this.webApiUrl = (<any>window).webApiAddress; // Get the webApiUrl from the window variable
    }

    /**
     * Add token authorization to header requests
     * @param headers
     */
    private createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Bearer ' + window.sessionStorage.getItem('token')); // Get token from session
    }

    /**
     * Make a GET request
     * @param url - The URL location of the webapi
     * @param updateCache - Refresh the version in the cache
     */
    public get(url: string, updateCache: boolean = true): Observable<any> {
        
        // Create auth headers
        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        // If this request is not in the cache or updateCache was requested (default behavior), load content into cache
        if (!this.cache[url] || updateCache) {
            this.cache[url] = this.http.get(url, { headers: headers })
                .publishReplay(1)
                .refCount();
        }
        return this.cache[url];

    } // end get

    /**
     * Make a POST request
     * @param url - The URL location of the webapi
     * @param data - The data to pass to the server
     */
    public post(url: string, data: any): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {headers: headers});
    } // end post

    /**
     * Make a PUT request
     * @param url - The URL location of the webapi
     * @param data - The data to pass to the server
     */
    public put(url: string, data: any): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    } // end post

    /**
  * Make a DELETE request
  * @param url - The URL location of the webapi
  * @param data - The data to pass to the server
  */
    public delete(url: string, data: any): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    } // end post

}