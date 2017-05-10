import { Injectable } from '@angular/core';

//Typings needed to get analytics snippets to play nice in typescript
declare var window: any;
declare var mixpanel: any;
declare var ga: any;
declare var $: any;

@Injectable()
export class LoggingService {

    // Master  list of static super properties, these are sent with every event
    private appType: any = {
        'Product': 'M',
        'User': 'A',
        'Experience': 'U',
        'Website': 'Angular Seed Complete'
    };

    private prodHost: string = 'www.example.com';   //Prod domain, used to switch tokens. This should match the hostname
    private isProd: boolean = false; // Is prod set?
    private tokenCurrent: string = '12b6209da24f589a1e85535df6db3bf3';   //Mixpanel dev token
    private tokenProd: string = 'eea5001f0d24f84c3ae2b6ccfef2193f';  //Mixpanel prod token
    private gaToken: string = 'UA-12105805-4'; // GA prod token, no dev token
    private eventQueue: any[] = []; //Hold and queue events if mixpanel hasn't been loaded yet. This manages out of order/async events
    private isLoaded: boolean = false; //Wait for the analytics scripts to be loaded and register all the initial properties before the first event is passed

    constructor(
    ) {
        console.log('Loading Logging Service');
        //If we're on prod, set the prod flag
        if (window.location.hostname.toLowerCase().search(this.prodHost) > -1) {
            this.isProd = true;
        }
        this.loadScripts();

    }


    /**
     * Load analytics scripts
     */
    private loadScripts() {
        //Typings needed to get analytics snippets to play nice in typescript
        let gaNewElem, gaElems, MIXPANEL_CUSTOM_LIB_URL

        //If we're on prod, replace the mixpanel dev token with the prod version
        if (this.isProd) {
            this.tokenCurrent = this.tokenProd
        }
        console.log(this.tokenCurrent)
        //Load Google Analytics
        let currdate: any = new Date();
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * currdate; a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga', gaNewElem, gaElems);
        ga('create', this.gaToken, 'auto');
        ga('send', 'pageview'); //Comment this out if we need to fire a page load manually

        //Load Mixpanel
        (function (e, a) {
            if (!a.__SV) {
                var b = window; try { var c, l, i, j = b.location, g = j.hash; c = function (a, b) { return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null }; g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search))) } catch (m) { } var k, h; window.mixpanel = a; a._i = []; a.init = function (b, c, f) {
                    function e(b, a) {
                        var c = a.split("."); 2 == c.length && (b = b[c[0]], a = c[1]); b[a] = function () {
                            b.push([a].concat(Array.prototype.slice.call(arguments,
                                0)))
                        }
                    } var d = a; "undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel"; d.people = d.people || []; d.toString = function (b) { var a = "mixpanel"; "mixpanel" !== f && (a += "." + f); b || (a += " (stub)"); return a }; d.people.toString = function () { return d.toString(1) + ".people (stub)" }; k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                    for (h = 0; h < k.length; h++)e(d, k[h]); a._i.push([b, c, f])
                }; a.__SV = 1.2;

                let po = document.createElement('script'); po.type = 'text/javascript'; po.async = true; po.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
                let s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            }
        })(document, window.mixpanel || []);
        mixpanel.init(this.tokenCurrent,
            {
                //Callback for when mixpanel loads successfully
                loaded: (mixpanel) => {
                    //this.init();
                }
            })
    }//end loadScripts


    /**
    * Business logic to happen after the analytics scripts have loaded
    * Super properties should be set here before any events are tracked so they are passed with every interaction
    */
    private init() {

        //Identify current user
        //mixpanel.identify(window.currentUser);

        //Add master list of super properties
        mixpanel.register(this.appType);

    }//end init


    /**
    * Track an event
    * @param eventName - String of event name, IE "Button Clicked"
    * @param data - Object of custom data to pass to mixpanel
    */
    public trackEvent(eventName: string, data?: Object) {
        console.log('trackEvent', eventName);
        let props = data || {};
        props['Url'] = window.location.pathname + window.location.hash

        //If module is loaded, pass the event
        if (this.isLoaded) {
            //If NOT on prod, pass a console statement for QA validation
            if (!this.isProd) {
                console.warn(eventName + ' ' + this.appType.Product + this.appType.User + this.appType.Experience, props);
            }
            mixpanel.track(eventName + ' ' + this.appType.Product + this.appType.User + this.appType.Experience, props);
            ga('send', 'event', eventName);
        }
        //If module is not loaded, pass this event into a queue that will pass the events after mixpanel loads
        else {
            let event = {};
            event[eventName] = props;
            this.eventQueue.push(event);
       }
    }//end trackEvent


    /**
     * 
     * @param aliasID
     */
    public alias(aliasID: string) {
        console.warn('Aliasing', aliasID);
        if (!this.isProd) {
            console.warn('Aliasing to', aliasID);
        }
        mixpanel.alias(aliasID);
    } // end alias

    /**
     * 
     * @param registerID
     */
    public identify(identifyID: string) {
        if (!this.isProd) {
            console.warn('Registering with ', identifyID);
        }
        mixpanel.identify(identifyID);
    } // end identify

}