import { StartupTable } from '../Tables/StartupTable';
import { ContactTable } from './ContactTable';
import { googleConfig } from '../Google/spreadsheets';
import { IStartup, IContact, IStartupTags, ITag } from '../models';
import { StartupTagsTable } from './StartupTagsTable';
import { ITable } from '../Google/GoogleSpreadSheetTable';
import { TagTable } from './TagTable';

export interface IHappyTechStore {
    startups: IStartup[];
    contacts: IContact[];
    startupTags: IStartupTags[];
    tags: ITag[];
}

export class Store {
    public model: IHappyTechStore;
    private tables: Array<ITable<any, IHappyTechStore>>;

    constructor() {
        this.model = { startups: [], contacts: [], startupTags: [], tags: [] };
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
        const sorted = [...startups];
        sorted.sort((s1, s2) => s1.rowId - s2.rowId);
        const postitions = sorted.map(s => s.latLng ? `${s.latLng.lat},${s.latLng.lng}` : '...');
        console.log(sorted.map(s => s.name).join('\n'))
        console.log(postitions.join('\n'));
    }

    public loadTables = async () => {
        this.buildTables();
        await this.sequenceLoadTables();
        this.tables.forEach(table => table.resolve1(this.model))
        this.tables.forEach(table => table.resolve2(this.model))
        console.log(this.model);
        // this.consoleLatLng();
    }

    // public reloadTables() {

    //     this.loadTables();
    // }

    private getSavedModel() {
        const model = localStorage.getItem('model')
        if (model !== null) {
            return JSON.parse(model);
        }
    }

    private buildTables() {
        const tablesToLoad = [
            StartupTable, TagTable, ContactTable, StartupTagsTable
        ];
        this.tables = tablesToLoad.map(t => new t(googleConfig.spreadsheetId));
    }

    private sequenceLoadTables = async () => {
        // 
        const model = this.getSavedModel();
        if (model) {
            this.model = model;
            return;
        }

        const tables = this.tables;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tables.length; i++) {
            const element = tables[i];
            const rows = await element.loadRows(this.model);
            this.model[element.name] = rows;
        }
        localStorage.setItem('model', JSON.stringify(this.model));
    }
}

export const getStore = async () => {
    const store = new Store();
    await store.load();
    return store.model;
}

export function findByName(list: any[], name: string) {
    const index = list.findIndex(s => s.name === name);
    if (index !== -1) {
        return list[index];
    }
}