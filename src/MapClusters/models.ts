import { ILatLng } from './../models';

export interface IMapClustersMarker<T> {
    position: ILatLng;
    content: T;
    isAdded: boolean;
}
