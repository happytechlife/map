

export interface ILatLng {
    lat: number;
    lng: number;
}

export interface IStartup {
    name: string;
    address: string;
    latLng?: ILatLng;
    iconUrl: string;
}