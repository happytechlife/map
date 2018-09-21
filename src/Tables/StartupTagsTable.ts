import { IStartupTags, IHappyTechStore } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import {  findByName } from "./Store";

export class StartupTagsTable extends GoogleSpreadSheetTable<IStartupTags, IHappyTechStore>{
    // 'startupTags!A1:Z'
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'startupTags')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IStartupTags> => {
        const startupTag: IStartupTags = { rowId, startup_name: d[0], tags: [], tagNames: [] };
        const startup = findByName(store.startups, startupTag.startup_name);
        const allTags = this.headers.slice(1);
        const tagsColumns = d.slice(1);
        const tagNames = tagsColumns.map((tc, i) => {
            if (tc.length > 0) {
                return allTags[i];
            }
            return null;
        }).filter(t => t) as string[];
        return Promise.resolve({ ...startupTag, startup, tags: [], tagNames });
    };

    public resolve1 = (store: IHappyTechStore) => {
        store.startupTags = store.startupTags.map(st => {
            // update own tag name
            st.tags = st.tagNames.map(tn => {
                return findByName(store.tags, tn)
            });
            // update startup relations
            const startup = findByName(store.startups, st.startup_name);
            if (startup) {
                startup.tags = st.tags;
            }
            st.startup = startup;
            return st;
        });
    }
}