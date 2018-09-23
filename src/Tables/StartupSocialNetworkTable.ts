import { IHappyTechStore, IStartupSocialNetwork } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";

export class StartupSocialNetworkTable extends GoogleSpreadSheetTable<IStartupSocialNetwork, IHappyTechStore>{
    // 'startupTags!A1:Z'
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'startupSocialNetworks')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IStartupSocialNetwork> => {
        const startupSocialNetwork: IStartupSocialNetwork = {
            rowId,
            startupName: d[0],
            webSite: d[1],
            linkedIn: d[2],
            twitter: d[3],
            facebook: d[4],
            instagram: d[5],
            youTube: d[6]
        };
        return Promise.resolve(startupSocialNetwork);
    };

}