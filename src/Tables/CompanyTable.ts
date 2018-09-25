import { ICompany } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "../models";

export class CompanyTable extends GoogleSpreadSheetTable<ICompany, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'entreprises')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<ICompany> => {
        const company = {
            rowId,
            name: d[0],
            description: d[1],
            startupNames: d[2] ? d[2].split(',').map(s => s.trim()) : [],
            logo: d[3],
            link: d[4]
        };
        return Promise.resolve(company);
    };
}

