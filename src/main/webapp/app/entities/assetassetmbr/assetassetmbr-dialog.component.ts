import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Assetassetmbr } from './assetassetmbr.model';
import { AssetassetmbrPopupService } from './assetassetmbr-popup.service';
import { AssetassetmbrService } from './assetassetmbr.service';

@Component({
    selector: 'jhi-assetassetmbr-dialog',
    templateUrl: './assetassetmbr-dialog.component.html'
})
export class AssetassetmbrDialogComponent implements OnInit {

    assetassetmbr: Assetassetmbr;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private assetassetmbrService: AssetassetmbrService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['assetassetmbr']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assetassetmbr.id !== undefined) {
            this.assetassetmbrService.update(this.assetassetmbr)
                .subscribe((res: Assetassetmbr) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.assetassetmbrService.create(this.assetassetmbr)
                .subscribe((res: Assetassetmbr) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Assetassetmbr) {
        this.eventManager.broadcast({ name: 'assetassetmbrListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-assetassetmbr-popup',
    template: ''
})
export class AssetassetmbrPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetassetmbrPopupService: AssetassetmbrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.assetassetmbrPopupService
                    .open(AssetassetmbrDialogComponent, params['id']);
            } else {
                this.modalRef = this.assetassetmbrPopupService
                    .open(AssetassetmbrDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
