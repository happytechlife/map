import { IPresse } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "../models";

export class PresseTable extends GoogleSpreadSheetTable<IPresse, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'presse')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IPresse> => {
        const partner = {
            rowId,
            source: d[0],
            title: d[1],
            tagline: d[2],
            author: d[3],
            link: d[4],
            authorTwitter: d[5],
            dateString: d[6],
            logo: d[7]
        };
        return Promise.resolve(partner);
    };
}
