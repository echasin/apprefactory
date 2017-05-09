import { Asset } from '../asset';
export class Assetrecordtype {
    constructor(
        public id?: number,
        public name?: string,
        public asset?: Asset,
    ) {
    }
}
