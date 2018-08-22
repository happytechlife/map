import { IStartup, ILatLng, IContact } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { geocode } from '../Google/geocoder';
import { IHappyTechStore } from "./Store";

export class StartupTable extends GoogleSpreadSheetTable<IStartup, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'startups!A2:H')
    }

    public parse = async (rowId: number, values: string, store: IHappyTechStore) => {
        const d = values;
        const address = d[1];
        const latLng: ILatLng = { lat: 0, lng: 0 };
        const contacts: IContact[] = [];
        let startup: IStartup = { rowId, name: d[0], address, iconUrl: d[2], contacts, latLng };
        if (d[3]) {
            const [lat, lng] = d[3].split(',');
            startup.latLng = { lat: parseFloat(lat), lng: parseFloat(lng) }
        } else {
            startup = await geocodeStartup(startup)
        }
        return startup;
    };
}

const geocodeStartup = async (startup: IStartup) => {
    const latlng = await geocode(startup.address);
    console.log('geocode', startup.name, latlng);
    if (latlng) {
        startup.latLng = latlng;
    }
    return startup;
}