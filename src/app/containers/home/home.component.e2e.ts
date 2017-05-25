import { browser, by, element } from 'protractor';

describe('home.component.ts', () => {
    
    beforeEach(() => {
        browser.get('/#/');
    });

    it('should have a nav menu', () => {
        let subject = element(by.css('.navbar-nav')).isPresent();
        let result = true;
        expect<any>(subject).toEqual(result);
    });
    
});
