import { browser, by, element } from 'protractor';

describe('LoginComponent', () => {

    browser.get('/#/login');

    //beforeEach(() => {
        //browser.get('/#/login');
    //});
    /*
    SAMPLE USAGE:
    let greenParagraph = element(by.css('p.green')); // Select an element
    let greenParagraphs = element.all(by.css('p.green')); // Select many elements
    let greenParagraph = element(by.css('p.green')).getText(); // Get element text
    let submitButton = element(by("form .submit-button")).click(); // Click element
    let blueParagraphsList = elements.all(by("p.blue")).count(); // Count elements
    */
    

    it('should not have a nav menu', () => {
        let subject = element(by.css('.navbar-nav')).isPresent();
        let result = false;
        expect<any>(subject).toEqual(result);
    });

    it('should have a login, password and remember password fields', () => {
        let subject = element.all(by.css('input')).count();
        let result = 3;
        expect<any>(subject).toEqual(result);
    });

    it('should have login button be disabled by default', () => {
        let subject = element(by.css('form button[type="submit"]'));
        let result = true;
        expect<any>(subject.isEnabled()).toEqual(false);
    });

    it('should have login button enabled with valid email and password', () => {
        element(by.css('form .login')).sendKeys('eat@joes.com');
        element(by.css('form .password')).sendKeys('123456');
        let subject = element(by.css('form button[type="submit"]'));
        let result = true;
        expect<any>(subject.isEnabled()).toEqual(true);
    });

    it('should route to new page on successful submit', () => {
        element(by.css('form .login')).clear();
        element(by.css('form .login')).sendKeys('eat@joes.com');
        element(by.css('form .password')).clear();
        element(by.css('form .password')).sendKeys('123456');
        element(by.css('form button[type="submit"]')).click();

        return browser.wait(() => {
            return browser.getCurrentUrl().then((url) => {
                if (url.indexOf('login') == -1) {
                    return true;
                } else {
                    return false;
                }
            });
        }, 5000);

    });



});
