import { IHappyTechStore, IStartupPitch } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";

export class StartupPitchsTable extends GoogleSpreadSheetTable<IStartupPitch, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'startupPitchs')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IStartupPitch> => {
        const pitch: IStartupPitch = {
            rowId,
            startupName: d[0],
            presentation: d[1],
            problems: d[2],
            numbers: d[3]
        };
        return Promise.resolve(pitch);
    };

}