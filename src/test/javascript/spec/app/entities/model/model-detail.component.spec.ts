import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { ApprefactoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModelDetailComponent } from '../../../../../../main/webapp/app/entities/model/model-detail.component';
import { ModelService } from '../../../../../../main/webapp/app/entities/model/model.service';
import { Model } from '../../../../../../main/webapp/app/entities/model/model.model';

describe('Component Tests', () => {

    describe('Model Management Detail Component', () => {
        let comp: ModelDetailComponent;
        let fixture: ComponentFixture<ModelDetailComponent>;
        let service: ModelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApprefactoryTestModule],
                declarations: [ModelDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModelService,
                    EventManager
                ]
            }).overrideComponent(ModelDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Model(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.model).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
