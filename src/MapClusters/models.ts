import { ILatLng } from './../models';

export interface IMapClustersMarker<T> {
    position: ILatLng;
    content: T;
    isAdded: boolean;
}

// export interface IOverlayView {
//     draw(): void;
//     getMap(): IMap;
//     // getPanes(): MapPanes;
//     getProjection(): MapCanvasProjection;
//     onAdd(): void;
//     onRemove(): void;
//     setMap(map: IMap | null): void;
// }

// export interface MapCanvasProjection {
//     fromContainerPixelToLatLng(pixel: IPoint, nowrap?: boolean): ILatLng;
//     fromDivPixelToLatLng(pixel: IPoint, nowrap?: boolean): ILatLng;
//     fromLatLngToContainerPixel(latLng: LatLng): IPoint;
//     fromLatLngToDivPixel(latLng: LatLng): IPoint;
//     getWorldWidth(): number;
// }
