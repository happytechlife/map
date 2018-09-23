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
    tags: ITag[];
    description: string;
}

export interface IContact extends IRow {
    startup_name: string;
    startup?: IStartup;
    firstname: string;
    lastname: string;
    email: string;
}

export interface ITeamMember extends IRow {
    firstname: string;
    lastname: string;
    email: string;
    team: string;
    role: string;
    // telephone:string;
    active: boolean;
    linkedin: string;
    twitter: string;
    facebook: string;
    picture: string;
    fullname: string;
}


export type TagName = string;// 'AI' | 'VR/AR' | 'MobileApp' | 'WebApp' | 'SocialNetwork' | 'Device' | 'IOT' | 'Nature';
export interface IStartupTags extends IRow {
    startup_name: string;
    startup?: IStartup;
    tags: ITag[];
    tagNames: TagName[];
}

export interface ITag extends IRow {
    name: TagName;
    startups: IStartup[];
}


export interface ISocialNetwork {
    webSite: string;
    linkedIn: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youTube: string;
}

export interface IHappyTechStore {
    startups: IStartup[];
    contacts: IContact[];
    startupTags: IStartupTags[];
    tags: ITag[];

    team: ITeamMember[];
}

