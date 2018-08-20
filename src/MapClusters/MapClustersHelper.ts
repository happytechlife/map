import { ILatLng } from './../models';
import { IMapClustersMarker } from './models';

export const distanceBetweenPoints = (p1: ILatLng, p2: ILatLng) => {
    if (!p1 || !p2) {
        return 0;
    }
    const R = 6371; // Radius of the Earth in km
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLon = (p2.lng - p1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};


export function getGoogleLatLng(latLng: ILatLng) {
    const { lat, lng } = latLng;
    return new google.maps.LatLng(lat, lng)
}
export function isMarkerInBounds<T>(marker: IMapClustersMarker<T>, bounds: google.maps.LatLngBounds) {
    return bounds.contains(getGoogleLatLng(marker.position));
};
