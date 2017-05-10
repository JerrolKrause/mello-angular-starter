import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store'; // Ngrx store (Redux)
import { EffectsModule  } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Bootstrap

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { AppComponent } from './app.component'; // App is our top level component

// Containers/Routes
import {
    // Layout
    LayoutMainComponent,
    LayoutSingleComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    // Routes
    HomeComponent,
    NoContentComponent,
    LoginComponent,

    // Scaffolding, can be removed
    ScaffoldingComponent,
    StoreExampleComponent,
    RestApiComponent,
    TemplateFormComponent,
    ReactiveFormComponent
} from 'app-containers';

// Reusuable components
import {
    ErrorComponent,
    ButtonModalComponent,
    FieldComponent,

    // Scaffolding, can be removed
    // Ng-bootstrap modals also need to be added in this file to "entryComponents"
    SampleModalComponent,
    LogoutModalComponent
} from 'app-components';

// Shared services and elements
import {
    // Services
    GlobalErrorHandler,
    AppState,
    LoggingService,
    AuthService,
    AuthGuard,

    // State management
    InternalStateType,
    StoreMainReducer,
    StoreMainEffects
} from 'app-shared';

// Application stylesheet. Import everything here
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    GlobalErrorHandler,
    AppState,
    LoggingService,
    AuthService,
    AuthGuard
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        // Containers
        LayoutMainComponent,
        LayoutSingleComponent,
        HeaderComponent,
        NavComponent,
        FooterComponent,
        HomeComponent,
        NoContentComponent,
        LoginComponent,

        // Components
        ErrorComponent,
        ButtonModalComponent,
        FieldComponent,

        //Scaffolding, can be removed
        ScaffoldingComponent,
        RestApiComponent,
        TemplateFormComponent,
        ReactiveFormComponent,
        StoreExampleComponent,
        SampleModalComponent,
        LogoutModalComponent
    ],
    // import Angular's modules
    imports: [ 
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
        // Add ngrx reducers here, works just like a normal dependency injection in a constructor
        StoreModule.provideStore({ StoreMainReducer: StoreMainReducer}),// Inject stores here
        EffectsModule.run(StoreMainEffects),
        // Bootstrap
        NgbModule.forRoot()
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS,
        Title,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        LoggingService,
        AuthService,
        AuthGuard
    ], // Ng-bootstrap modals
    entryComponents: [
        SampleModalComponent, LogoutModalComponent
    ]
})
export class AppModule {

    constructor(
        public appRef: ApplicationRef,
        public appState: AppState,
        public authService: AuthService,
        public loggingService: LoggingService
    ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
