import * as React from 'react';
// import './Map.css';
import GoogleMapReact from 'google-map-react';
import { MapClusters } from './MapClusters';
import { StartupCluster } from './../Components/StartupCluster';
import { CircularProgress } from '@material-ui/core';
import { IStartup, IContact, ILatLng } from '../models';

// const comeet = { lat: 48.898149, lng: 2.2340453 };
const eiffelTower = { lat: 48.8583701, lng: 2.2922926 };

interface IProps {
    startups?: IStartup[];
    contacts?: IContact[];
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
        const { startups } = this.props;
        if (startups && map) {
            const markers = startups.map(s => ({
                position: s.latLng || { lat: 0, lng: 0 },
                content: s,
                isAdded: false
            })).filter(s => s);
            const mc = new MapClusters(map, markers);
            mc.createClusters();
            return mc.clusters.map((c, i) => <StartupCluster key={i} {...c.center} cluster={c} />)
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
                mapTypeId: 'roadmap'
            },
        }
    }


    public renderLoader() {
        const { startups } = this.props;
        if (!startups) {
            return <CircularProgress className="Loader" size={64} />
        }
        return null;
    }

    public render() {
        const options = this.mapOptions();
        return (
            <div style={{ height: '100vh' }}>
                <GoogleMapReact {...options}>
                    {this.renderClusters()}
                </GoogleMapReact>
            </div>
        );
    }

    private mapUpdated = ({ zoom }: IMapsChanged) => {
        this.setState({ zoom });
    }
}


