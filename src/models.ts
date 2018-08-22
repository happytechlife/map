import { IRow } from "./Google/GoogleSpreadSheetTable";


export interface ILatLng {
    lat: number;
    lng: number;
}

export interface IStartup extends IRow {
    name: string;
    address: string;
    latLng: ILatLng;
    iconUrl: string;
    contacts: IContact[];
}

export interface IContact extends IRow {
    starup_name: string;
    startup?: IStartup;
    firstname: string;
    lastname: string;
    email: string;
}

export interface ISocialNetwork {
    webSite: string;
    linkedIn: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youTube: string;
}