import { IStartup, ILatLng, IContact, IStartupSocialNetwork, IStartupPitch } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { geocode } from '../Google/geocoder';
import { IHappyTechStore } from "./../models";
import { findByKey } from "./Store";

export class StartupTable extends GoogleSpreadSheetTable<IStartup, IHappyTechStore>{
    // 'startups!A1:H'
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'startups')
    }

    public parse = async (rowId: number, values: string[], store: IHappyTechStore) => {
        const d = values;
        const address = d[1];
        const latLng: ILatLng = { lat: 0, lng: 0 };
        const contacts: IContact[] = [];
        const description = d[5];
        const startup: IStartup = {
            rowId,
            name: d[0],
            address,
            iconUrl: d[2],
            contacts,
            latLng,
            tags: [],
            description,
            tagline: d[4] || ''
        };
        if (d[3]) {
            const [lat, lng] = d[3].split(',');
            startup.latLng = { lat: parseFloat(lat), lng: parseFloat(lng) }
        } else {
            // startup = await geocodeStartup(startup)
        }
        return startup;
    };

    public resolve1 = (store: IHappyTechStore) => {
        store.startups = store.startups.map(s => {
            const socialNetwork = findByKey<IStartupSocialNetwork>(store.startupSocialNetworks, 'startupName', s.name);
            if (socialNetwork) {
                s.socialNetwork = socialNetwork;
            }
            const pitch = findByKey<IStartupPitch>(store.startupPitchs, 'startupName', s.name);
            if (pitch) {
                s.pitch = pitch;
            }
            return s;
        })
    }
}

const geocodeStartup = async (startup: IStartup) => {
    const latlng = await geocode(startup.address);
    if (latlng) {
        console.log('geocode', startup.name, `${latlng.lat},${latlng.lng}`);
        startup.latLng = latlng;
    } else {
        console.log('impossible to geocode', startup.name);
    }
    return startup;
}