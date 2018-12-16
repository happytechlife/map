
import { ICompany, IQuote } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "../models";
import { findByName } from "./Store";

export class QuoteTable extends GoogleSpreadSheetTable<IQuote, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'citations')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IQuote> => {
        const quote = {
            rowId,
            startupName: d[0],
            level: d[2],
            quote: d[3]
        };
        return Promise.resolve(quote);
    };

    public resolve2 = (store: IHappyTechStore) => {
        store.citations = store.citations.map(c => {
            const startup = findByName(store.startups, c.startupName);
            c.startup = startup;
            return c;
        });
    }
}

