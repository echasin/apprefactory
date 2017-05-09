import { Assetrecordtype } from '../assetrecordtype';
export class Asset {
    constructor(
        public id?: number,
        public name?: string,
        public assetrecordtype?: Assetrecordtype,
    ) {
    }
}
