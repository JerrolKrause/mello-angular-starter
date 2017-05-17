import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Load the implementations that should be tested
import { ButtonModalComponent } from './button-modal.component';

import { NgbModule, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

describe(`button-modal.component`, () => {
    let comp: ButtonModalComponent;
    let fixture: ComponentFixture<ButtonModalComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    
    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgbModule.forRoot()],
            declarations: [ButtonModalComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: []
        })
        .compileComponents(); // compile template and css
    }));

    /**
   * Synchronous beforeEach.
   */
    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonModalComponent);
        comp = fixture.componentInstance;

        /**
         * Trigger initial data binding.
         */
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('button'));
        el = de.nativeElement;

        fixture.detectChanges();

    });

    it('should have a button', () => {
        expect(el).not.toBeNull;
    });

    it('should be able to change model data', () => {
        comp.data = {test:'test'};
        fixture.detectChanges(); // detect changes explicitly
        expect(comp.data).toEqual({ test: 'test' });
    });

    it('should be able to change modal being requested', () => {
        comp.modal = 'SampleModalComponent';
        fixture.detectChanges(); // detect changes explicitly
        expect(comp.modal).toEqual('SampleModalComponent');
    });


    it('should have a dictionary of available modals', () => {
        expect(Object.keys(comp.modalsList).length).toBeGreaterThan(0);
    });

    
    it('should have default css classes', () => {
        expect(comp.classes).toEqual('btn btn-outline-primary btn-sm');
    });

    it('should be able to change the css classes', () => {
        comp.classes = 'btn btn-info';
        fixture.detectChanges(); // detect changes explicitly
        expect(comp.classes).toEqual('btn btn-info');
    });

    it('should have default modal size', () => {
        expect(comp.size).toEqual('md');
    });

    
    
});
