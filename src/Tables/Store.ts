import { StartupTable } from '../Tables/StartupTable';
import { ContactTable } from './ContactTable';
import { googleConfig } from '../Google/spreadsheets';
import { IStartup, IContact } from '../models';


export interface IHappyTechStore {
    startups: IStartup[];
    contacts: IContact[];
}

export class Store {
    public model: IHappyTechStore;

    constructor() {
        this.model = { startups: [], contacts: [] };
    }
    public load = async () => {
        return new Promise<void>(r => {
            gapi.load("client", () => {
                gapi.client.init({ apiKey: googleConfig.apiKey }).then(async () => {
                    await this.loadTables();
                    r();
                })
            });
        })
    }

    public consoleLatLng() {
        const { startups } = this.model;
        startups.sort((s1, s2) => s1.rowId - s2.rowId);
        const postitions = startups.map(s => s.latLng ? `${s.latLng.lat},${s.latLng.lng}` : '...');
        console.log(startups.map(s => s.name).join('\n'))
        console.log(postitions.join('\n'));
    }
    public loadTables = async () => {
        const startupsTable = new StartupTable(googleConfig.spreadsheetId);
        this.model.startups = await startupsTable.loadRows(this.model);
        const contactTable = new ContactTable(googleConfig.spreadsheetId);
        this.model.contacts = await contactTable.loadRows(this.model);
        console.log(this.model);
        this.consoleLatLng();

    }
}