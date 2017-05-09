import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Asset } from './asset.model';
import { AssetPopupService } from './asset-popup.service';
import { AssetService } from './asset.service';
import { Assetrecordtype, AssetrecordtypeService } from '../assetrecordtype';

@Component({
    selector: 'jhi-asset-dialog',
    templateUrl: './asset-dialog.component.html'
})
export class AssetDialogComponent implements OnInit {

    asset: Asset;
    authorities: any[];
    isSaving: boolean;

    assetrecordtypes: Assetrecordtype[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private assetService: AssetService,
        private assetrecordtypeService: AssetrecordtypeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['asset']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.assetrecordtypeService.query().subscribe(
            (res: Response) => { this.assetrecordtypes = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.asset.id !== undefined) {
            this.assetService.update(this.asset)
                .subscribe((res: Asset) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.assetService.create(this.asset)
                .subscribe((res: Asset) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Asset) {
        this.eventManager.broadcast({ name: 'assetListModification', content: 'OK'});
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

    trackAssetrecordtypeById(index: number, item: Assetrecordtype) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-asset-popup',
    template: ''
})
export class AssetPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetPopupService: AssetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.assetPopupService
                    .open(AssetDialogComponent, params['id']);
            } else {
                this.modalRef = this.assetPopupService
                    .open(AssetDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
