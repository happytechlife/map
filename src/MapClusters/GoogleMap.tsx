import * as React from 'react';
// import './Map.css';
import GoogleMapReact from 'google-map-react';
import { MapClusters } from './MapClusters';
import StartupCluster from './../Components/StartupCluster';
import { ILatLng, IStartup } from '../models';
import { IHappyTechStore } from '../models';
import { MapCluster } from './MapCluster';
// import { mapStyles } from './MapStyle';


// const comeet = { lat: 48.898149, lng: 2.2340453 };
const eiffelTower = { lat: 48.8583701, lng: 2.2922926 };

interface IProps {
    store?: IHappyTechStore;
}

interface IState {
    map?: google.maps.Map;
    zoom?: number;
}

interface IMapLoaded {
    map: google.maps.Map;
}

interface IMapsChanged {
    center: ILatLng;
    zoom: number;
}
export class GoogleMap extends React.Component<IProps, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {};
    }


    public mapLoaded = ({ map }: IMapLoaded) => {
        this.setState({ map });
    }
    public renderClusters() {
        const { map } = this.state;
        const { store } = this.props;
        if (store && map) {
            const markers = store.startups.map(s => ({
                position: s.latLng || { lat: 0, lng: 0 },
                content: s,
                isAdded: false
            })).filter(s => s);
            const mc = new MapClusters(map, markers);
            mc.createClusters();
            return mc.clusters.map((c, i) => <StartupCluster onClick={this.onClusterClick} key={i} {...c.center} cluster={c} />)
        }
        return null;
    }

    public mapOptions = () => {
        return {
            center: eiffelTower,
            zoom: 5,
            onGoogleApiLoaded: this.mapLoaded,
            onChange: this.mapUpdated,
            yesIWantToUseGoogleMapApiInternals: true,
            options: {
                disableDefaultUI: true,
                mapTypeId: 'roadmap',
                scrollwheel: true
                // styles: mapStyles
            },
        }
    }

    public render() {
        const options = this.mapOptions();
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact {...options}>
                    {this.renderClusters()}
                </GoogleMapReact>
            </div>
        );
    }


    private onClusterClick = (c: MapCluster<IStartup>) => {
        const { map } = this.state;
        if (map) {
            map.fitBounds(c.bounds);
            console.log('click', c);
        }
    }

    private mapUpdated = ({ zoom }: IMapsChanged) => {
        this.setState({ zoom });
    }
}


