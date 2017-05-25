import { browser, by, element, protractor } from 'protractor';

describe('qa.component.ts', () => {
    
    beforeEach(() => {
        browser.get('/#/qa');
    });

    it('should be able to launch a modal by clicking the button modal component', () => {
        let actions = [
            element(by.css('.btn-qa')).click()
        ];
        protractor.promise.all(actions).then((values) => {
            let subject = element(by.css('.modal')).isPresent();
            let result = true;
            expect<any>(subject).toEqual(result);
        });

    });

    it('should be able to close the modal by clicking on the X in the modal header', () => {
        let actions = [
            element(by.css('.btn-qa')).click(),
            element(by.css('.modal .close')).click()
        ];
        protractor.promise.all(actions).then((values) => {
            let subject = element(by.css('.modal')).isPresent();
            let result = false;
            expect<any>(subject).toEqual(result);
        });
        
    });

    /*
    it('should be able to close the modal by clicking on the background', () => {
        let promise1 = element(by.css('.btn-qa')).click();
        let promise2 = element(by.css('ngb-modal-window')).click();
        protractor.promise.all([promise1, promise2]).then((values) => {
            let subject = element(by.css('.modal')).isPresent();
            let result = false;
            expect<any>(subject).toEqual(result);
        });
    });

    it('should be able to close the modal by clicking on the continue working', () => {
        let promise1 = element(by.css('.btn-qa')).click();
        let promise2 = element(by.css('button[qa="continue"]')).click();
        protractor.promise.all([promise1, promise2]).then((values) => {
            let subject = element(by.css('.modal')).isPresent();
            let result = false;
            expect<any>(subject).toEqual(result);
        });
    });

    it('should be able to click the logout button and be redirected to the login page', () => {
        let promise1 = element(by.css('.btn-qa')).click();
        let promise2 = element(by.css('button[qa="logout"]')).click();
        
        protractor.promise.all([promise1, promise2]).then( (values) => {

            return browser.getCurrentUrl().then((url) => {
                if (url.indexOf('qa') == 1) {
                    return true;
                } else {
                    return false;
                }
            });

        });
    });
  */
});
