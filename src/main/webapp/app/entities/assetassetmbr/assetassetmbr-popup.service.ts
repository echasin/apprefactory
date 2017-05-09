import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Assetassetmbr } from './assetassetmbr.model';
import { AssetassetmbrService } from './assetassetmbr.service';
@Injectable()
export class AssetassetmbrPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private assetassetmbrService: AssetassetmbrService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.assetassetmbrService.find(id).subscribe((assetassetmbr) => {
                this.assetassetmbrModalRef(component, assetassetmbr);
            });
        } else {
            return this.assetassetmbrModalRef(component, new Assetassetmbr());
        }
    }

    assetassetmbrModalRef(component: Component, assetassetmbr: Assetassetmbr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assetassetmbr = assetassetmbr;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
