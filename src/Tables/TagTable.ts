import { ITag, IStartup } from "../models";
import { GoogleSpreadSheetTable, useHeaderToParse } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "./Store";

export class TagTable extends GoogleSpreadSheetTable<ITag, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'tags')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<ITag> => {
        return useHeaderToParse(this.camelizedHeaders, rowId, d, store);
    };

    public resolve2 = (store: IHappyTechStore) => {
        store.tags = store.tags.map(tag => {
            const startups = store.startupTags
                .filter(st => st.startup && st.startup.tags.find(t => tag.name === t.name))
                .map(st => st.startup)
                .filter(s => s) as IStartup[];
            tag.startups = startups;
            return tag;
        });
    }
}