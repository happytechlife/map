import { ILatLng } from './../models';
import { MapClusters } from './MapClusters';
import { IMapClustersMarker } from './models';
import { getGoogleLatLng } from './MapClustersHelper';

export class MapCluster<T> {
    public mapClusters: MapClusters<T>;
    public map: google.maps.Map;
    public center: ILatLng;
    public bounds: google.maps.LatLngBounds;
    public markers: Array<IMapClustersMarker<T>>;

    constructor(mapClusters: MapClusters<T>) {
        this.mapClusters = mapClusters;
        this.markers = [];
    }

    public isMarkerAlreadyAdded = (marker: IMapClustersMarker<T>) => {
        if (this.markers.indexOf) {
            return this.markers.indexOf(marker) !== -1;
        } else {
            // tslint:disable-next-line:no-conditional-assignment
            for (let i = 0, m; m = this.markers[i]; i++) {
                if (m === marker) {
                    return true;
                }
            }
        }
        return false;
    }
    public addMarker(marker: IMapClustersMarker<T>) {
        if (this.isMarkerAlreadyAdded(marker)) {
            return false;
        }
        if (!this.center) {
            this.center = marker.position;
            this.calculateBounds();
        } else {
            if (this.mapClusters.averageCenter) {
                const l = this.markers.length + 1;
                const lat = (this.center.lat * (l - 1) + marker.position.lat) / l;
                const lng = (this.center.lng * (l - 1) + marker.position.lng) / l;
                this.center = { lat, lng };
                this.calculateBounds();
            }
        }

        marker.isAdded = true;
        this.markers.push(marker);
        return true;
    }

    public isMarkerInClusterBounds = (marker: IMapClustersMarker<T>) => {
        const { lat, lng } = marker.position;
        return this.bounds.contains(new google.maps.LatLng(lat, lng));
    };
    private calculateBounds() {
        const center = getGoogleLatLng(this.center);
        const bounds = new google.maps.LatLngBounds(center, center);
        this.bounds = this.mapClusters.getExtendedBounds(bounds);
    }

}
