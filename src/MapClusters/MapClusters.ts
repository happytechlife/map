import { MapCluster } from './MapCluster';
import { distanceBetweenPoints, isMarkerInBounds } from './MapClustersHelper';
import { IMapClustersMarker } from './models';

// declare let window: any;/
export class MapClusters<T> extends google.maps.OverlayView {
    public clusters: Array<MapCluster<T>>;
    public markers: Array<IMapClustersMarker<T>>;
    public map: google.maps.Map;
    public gridSize: number;
    public averageCenter: boolean;
    constructor(map: google.maps.Map, markers: Array<IMapClustersMarker<T>>) {
        super();
        this.map = map;
        this.clusters = [];
        this.gridSize = 60;
        this.markers = markers;
        this.setMap(this.map);
        this.averageCenter = false;
    }

    public draw() {
        return true;
    }
    public addToClosestCluster = (marker: IMapClustersMarker<T>) => {
        let distance = 40000; // Some large number
        let clusterToAddTo: MapCluster<T> | null = null;
        // tslint:disable-next-line:no-conditional-assignment
        for (let i = 0, cluster; cluster = this.clusters[i]; i++) {
            const center = cluster.center;
            if (center) {
                const d = distanceBetweenPoints(center, marker.position);
                if (d < distance) {
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
            clusterToAddTo.addMarker(marker);
        } else {
            const cluster = new MapCluster(this);
            cluster.addMarker(marker);
            this.clusters.push(cluster);
        }
    }

    public getExtendedBounds(bounds: google.maps.LatLngBounds) {
        const projection = this.getProjection();
        // Turn the bounds into latlng.
        const tr = new google.maps.LatLng(
            bounds.getNorthEast().lat(),
            bounds.getNorthEast().lng());
        const bl = new google.maps.LatLng(
            bounds.getSouthWest().lat(),
            bounds.getSouthWest().lng());

        // Convert the points to pixels and the extend out by the grid size.
        const trPix = projection.fromLatLngToDivPixel(tr);
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;

        const blPix = projection.fromLatLngToDivPixel(bl);
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;

        // Convert the pixel points back to LatLng
        const ne = projection.fromDivPixelToLatLng(trPix);
        const sw = projection.fromDivPixelToLatLng(blPix);

        // Extend the bounds to contain the new bounds.
        bounds.extend(ne);
        bounds.extend(sw);

        return bounds;
    }

    public createClusters() {
        if (this.map) {
            const b = this.map.getBounds();
            if (b) {
                const mapBounds = new google.maps.LatLngBounds(
                    b.getSouthWest(),
                    b.getNorthEast());
                const bounds = this.getExtendedBounds(mapBounds);

                // tslint:disable-next-line:no-conditional-assignment
                for (let i = 0, marker; marker = this.markers[i]; i++) {
                    if (!marker.isAdded && isMarkerInBounds(marker, bounds)) {
                        this.addToClosestCluster(marker);
                    }
                }
            }
        }
    }
}