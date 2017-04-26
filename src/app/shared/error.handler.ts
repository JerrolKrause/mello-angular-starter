import { ErrorHandler, Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private errorLogApi: string = '/api/logerror'; // API to post errors too
    
    constructor(
    ) {
        this.removeError(); // Remove any errors on application load 
    }

    // Custom error handler for application/angular errors
    public handleError(error) {

        // Create error message, limit to 600 characters and add current page location
        let errorConcat = 'Error at ' + window.location.href + '. ' + error.message.substring(0, 600);
        let errorEscaped = errorConcat.replace(/[\"&<>]/g, (a) => { // Escape HTML before being outputted to DOM
            return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[a];
        });
        
        //this.logError(errorConcat); // Log Error, uncomment to add if API is available

        this.removeError(); // Remove previous errors

        // Create DOM element
        let alert = document.createElement('div');
        alert.id = 'errorApp';
        alert.classList.add('alert');
        alert.classList.add('alert-danger');
        alert.classList.add('icon');
        alert.classList.add('sticky-error');
        // Dom element content
        alert.innerHTML = `
            <button type="button" class="close" aria-label="Close" onclick="document.getElementById('errorApp').parentNode.removeChild(document.getElementById('errorApp'));">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>Application Error. </strong>
            <span>Please try refreshing this application and if this error persists send a screenshot to tech support.</span>
            <code>${errorEscaped}</code>
        `;
        //Insert into DOM
        document.body.appendChild(alert);

        // Now throw the error to the console
        throw error;
    } // end handleError

    /**
     * Remove any residual application error messages
     */
    public removeError() {
        if (document.getElementById('errorApp')) {
            document.getElementById('errorApp').parentNode.removeChild(document.getElementById('errorApp'));
        }
    } // end removeError

    /**
     * Log the error to an API
     */
    private logError(errorMsg: string) {
        let http = new XMLHttpRequest();
        let params = 'NEEDKEY=' + errorMsg;
        http.open("POST", this.errorLogApi, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = () => {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                console.info('Successfully logged error');
            }
        }
        http.send(params);
    }// end logError

}