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
    socialNetwork?: IStartupSocialNetwork;
    pitch?: IStartupPitch;
}

export interface IContact extends IRow {
    startup_name: string;
    startup?: IStartup;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    title: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    photo: string;
}

export interface ITeamMember extends IRow {
    firstname: string;
    lastname: string;
    email: string;
    team: string;
    role: string;
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
    socialNetworks?: IStartupSocialNetwork;
}


export interface ITag extends IRow {
    name: TagName;
    startups: IStartup[];
}


export interface IStartupSocialNetwork extends IRow {
    startupName: string;
    webSite: string;
    linkedIn: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youTube: string;
}

export interface IStartupPitch extends IRow {
    startupName: string;
    presentation: string;
    problems: string;
    numbers: string;
}




export interface ICompany extends IRow {
    name: string;
    description: string;
    startupNames: string[];
    logo: string;
    startups?: IStartup[];
    link: string;
}

export interface IPartner extends IRow {
    name: string;
    description: string;
    website: string;
    type: string;// 'Avantages pour startups' | 'Evenements'
    logo: string;
}

export interface IEvent extends IRow {
    name: string;
    description: string;
    startupNames: string[];
    date: Date;
    time: string;
    location: string;
    address: string;
    logo: string;
    registerLink: string;
}

export interface IHappyTechStore {
    startups: IStartup[];
    contacts: IContact[];
    startupTags: IStartupTags[];
    tags: ITag[];
    team: ITeamMember[];
    startupSocialNetworks: IStartupSocialNetwork[];
    startupPitchs: IStartupPitch[];
    events: IEvent[];
    partners: IPartner[];
    entreprises: ICompany[];
}
