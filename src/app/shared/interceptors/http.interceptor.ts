import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpInterceptor extends Http {
    
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    /**
     * Update URL with localized environment variable
     * @param req - string of url to modify
     */
    private updateUrl(req: string) {
        //interface Window { webApiAddress: any; }
        // Get Web API location from window variable supplied in index.html
        const environment = (<any>window).webApiAddress || '/';

        // Check if URl request string contains an http call, if so, do not prepend the environment variable
        if (req.indexOf('http') != -1) {
            return req;
        } else {
            return environment + req;
        }
    }

    /**
     * Update headers passed with every HTTp request
     * @param options
     */
    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        // If a token is present, pass that with the api request
        if (window.sessionStorage.token){
            options.headers.append('Authorization', 'Bearer ' + window.sessionStorage.token);
        }
        
        return options;
    }
}