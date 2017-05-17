import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions } from '@angular/http';
import { AppState, AuthService, LoggingService, HttpClient } from 'app-shared';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpModule],
          declarations: [ AppComponent ],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [AppState, Http, BaseRequestOptions, ConnectionBackend, AuthService, LoggingService, HttpClient]
    })
    .compileComponents(); // compile template and css
  }));

  describe('1st tests', () => {
      it('true is true', () => expect(true).toBe(true));
  });

    /*
  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
    /*
  it(`should be @AngularClass`, () => {
    expect(comp.url).toEqual('https://twitter.com/AngularClass');
    expect(comp.angularclassLogo).toEqual('assets/img/angularclass-avatar.png');
    expect(comp.name).toEqual('Angular 2 Webpack Starter');
  });
   
  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });
    */
});
