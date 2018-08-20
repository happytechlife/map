import * as React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import { MapClusters } from './MapClusters/MapClusters';
import { IStartup, ILatLng } from './models';
// import { Pin } from './Components/Pin';
import { geocode, parseStartupSheet } from './startupHelper';
import { StartupCluster } from './Components/StartupCluster';

const comeet = { lat: 48.898149, lng: 2.2340453 };

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

export const config = {
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
  discoveryDocs:
    ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "1lIQ3w3lFf_w-dKuqCgMqqLNrS9Kj37BnRaKAGbGJ0Us"
};

declare const gapi: any;



async function getValues<T>(spreadsheetId: string, range: string, parse: (d: string) => T): Promise<T[]> {
  return new Promise<T[]>(r => {
    gapi.client.load("sheets", "v4", () => {
      gapi.client.sheets.spreadsheets.values
        .get({
          range,
          spreadsheetId
        })
        .then((response: any) => {
          const data: string[] = Array.from(response.result.values);
          const res: T[] = data.map(parse);
          r(res);
        });
    });
  })
}

interface IState {
  startups?: IStartup[];
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
class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public initClient = () => {
    gapi.client
      .init({ ...config })
      .then(this.load);
  };
  public load = async () => {
    const startups: IStartup[] = await getValues<IStartup>(config.spreadsheetId, "startups!A2:H", parseStartupSheet)
    const latLngsPromises = startups.map(geocode);
    const latlngs = await Promise.all(latLngsPromises);
    for (let i = 0; i < startups.length; i++) {
      const latLng = latlngs[i];
      if (latLng) {
        startups[i] = { ...startups[i], latLng };
      }
    }
    this.setState({ startups })
    const postitions = startups.map(s => s.latLng ? `${s.latLng.lat},${s.latLng.lng}` : '...');
    console.log(startups.map(s => s.name).join('\n'))
    console.log(postitions.join('\n'));
  }

  public mapLoaded = ({ map }: IMapLoaded) => {
    this.setState({ map });
    gapi.load("client", this.initClient);
  }

  public renderClusters() {
    const { startups, map } = this.state;
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
  // public renderStartups() {
  //   const { startups } = this.state;
  //   return startups &&
  //     startups.map((s, i) => s.latLng && <Pin
  //       key={i} {...s.latLng} startup={s} />);
  // }
  public render() {
    const options = {
      center: comeet,
      zoom: 5,
      onGoogleApiLoaded: this.mapLoaded,
      onChange: this.mapUpdated,
      options: {
        disableDefaultUI: true,
        mapTypeId: 'roadmap'
      },
    };
    return (
      <div className="App">
        <div style={{ height: '100vh' }}>
          <GoogleMapReact {...options}>
            {/* {this.renderStartups()} */}
            {this.renderClusters()}
          </GoogleMapReact>
        </div>
      </div>
    );
  }

  private mapUpdated = ({ zoom }: IMapsChanged) => {
    this.setState({ zoom });
  }
}

export default App;

