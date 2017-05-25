import { browser, by, element } from 'protractor';

describe('login.component.ts', () => {
    /*
    beforeEach(() => {
       browser.get('/#/login');
    });

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

    it('should show password in plain text after clicking Show Password', () => {
        element(by.css('form .toggle-pwd')).click();
        let subject = element(by.css('form .password')).getAttribute('type')
        let result = 'TuNguyen@loandepot.com';
        expect<any>(subject).toEqual('text');
    });

    it('should have login button enabled with valid email and password', () => {
        element(by.css('form .login')).sendKeys('TuNguyen@loandepot.com');
        element(by.css('form .password')).sendKeys('123456');
        let subject = element(by.css('form button[type="submit"]'));
        let result = true;
        expect<any>(subject.isEnabled()).toEqual(true);
    });

    it('should route to new page on successful submit', () => {
        element(by.css('form .login')).clear();
        element(by.css('form .login')).sendKeys('TuNguyen@loandepot.com');
        element(by.css('form .password')).clear();
        element(by.css('form .password')).sendKeys('123456');
        element(by.css('form .remember')).click();
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

    it('should be able to click the logout button and be redirected to the login page', () => {
        element(by.css('form .login')).clear();
        element(by.css('form .login')).sendKeys('TuNguyen@loandepot.com');
        element(by.css('form .password')).clear();
        element(by.css('form .password')).sendKeys('123456');
        element(by.css('form .remember')).click();
        element(by.css('form button[type="submit"]')).click();

        return browser.wait(() => {
            element(by.css('.navbar-mobile .dropdown-toggle')).click();
            element(by.css('.navbar-mobile .logout')).click();
            return browser.wait(() => {
                return browser.getCurrentUrl().then((url) => {
                    if (url.indexOf('login') != -1) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }, 1000);
        }, 5000);
    });

    it('should remember the users login name if remember username was checked', () => {
        element(by.css('form .login')).clear();
        element(by.css('form .login')).sendKeys('TuNguyen@loandepot.com');
        element(by.css('form .password')).clear();
        element(by.css('form .password')).sendKeys('123456');
        element(by.css('form .remember')).click();
        element(by.css('form button[type="submit"]')).click();

        return browser.wait(() => {
            element(by.css('.navbar-mobile .dropdown-toggle')).click();
            element(by.css('.navbar-mobile .logout')).click();
            return browser.wait(() => {
                let subject = element(by.css('form .login')).getAttribute('value');
                let result = 'TuNguyen@loandepot.com';
                return subject.then((val) => {
                    if (val == result) {
                        return true;
                    } else {
                        return false;
                    }
                })
            }, 1000);
        }, 5000);
    });
    */
});
