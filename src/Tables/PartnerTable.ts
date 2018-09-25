import { IPartner } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "../models";

export class PartnerTable extends GoogleSpreadSheetTable<IPartner, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'partners')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IPartner> => {
        const partner = {
            rowId,
            name: d[0],
            description: d[1],
            website: d[2],
            type: d[4],
            logo: d[5]
        };
        return Promise.resolve(partner);
    };
}
