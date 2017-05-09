import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Assetassetmbr } from './assetassetmbr.model';
import { AssetassetmbrService } from './assetassetmbr.service';

@Component({
    selector: 'jhi-assetassetmbr-detail',
    templateUrl: './assetassetmbr-detail.component.html'
})
export class AssetassetmbrDetailComponent implements OnInit, OnDestroy {

    assetassetmbr: Assetassetmbr;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private assetassetmbrService: AssetassetmbrService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['assetassetmbr']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssetassetmbrs();
    }

    load(id) {
        this.assetassetmbrService.find(id).subscribe((assetassetmbr) => {
            this.assetassetmbr = assetassetmbr;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssetassetmbrs() {
        this.eventSubscriber = this.eventManager.subscribe('assetassetmbrListModification', (response) => this.load(this.assetassetmbr.id));
    }
}
