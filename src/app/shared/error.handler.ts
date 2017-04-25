import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(
    ) {
    }

    // Custom error handler for Angular based application errors
    handleError(error) {
        // Create error
        let title = document.createElement('strong');
        title.appendChild(document.createTextNode('Application Error. '));
        let msg = document.createElement('span');
        msg.appendChild(document.createTextNode(' Please try refreshing this application and if this error persists send a screenshot to tech support.'));
        let errorMsg = document.createElement('code');
        errorMsg.appendChild(document.createTextNode(error.message.substring(0, 600)));

        // Empty out global error box and insert error message
        document.getElementById('errorApp').innerHTML = null;
        document.getElementById('errorApp').appendChild(title);
        document.getElementById('errorApp').appendChild(msg);
        document.getElementById('errorApp').appendChild(errorMsg);
        document.getElementById('errorApp').style.display = 'block';
        // Now throw the error to the console
        throw error;
    } // end handleError

}