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

    public loadTables = async () => {
        const startupsTable = new StartupTable(googleConfig.spreadsheetId);
        this.model.startups = await startupsTable.loadRows(this.model);
        const contactTable = new ContactTable(googleConfig.spreadsheetId);
        this.model.contacts = await contactTable.loadRows(this.model);
        console.log(this.model);
    }
}