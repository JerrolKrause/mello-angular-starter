import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

    public errorOfKeys: string[]; // Array of keys in API error response
    @Input() error: IErrorApi; // The error object 
    private ignoreProps: string[] = ['_body', 'headers', 'errorMsg']; // API response keys to ignore

    constructor(
    ) { }

    ngOnInit() {
        // Create an array of keys to loop through and filter out anything on the ignore list
        this.errorOfKeys = Object.keys(this.error).filter((key) => {
            if (this.ignoreProps.indexOf(key) == -1) {
                return key;
            }
        });
    }

}