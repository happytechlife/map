import { ITeamMember } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "../models";

export class TeamTable extends GoogleSpreadSheetTable<ITeamMember, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'team')
    }

    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<ITeamMember> => {
        const team: ITeamMember = {
            rowId,
            firstname: d[0],
            lastname: d[1],
            email: d[2],
            team: d[4],
            role: d[5],
            active: d[6] === 'Oui',
            linkedin: d[7],
            twitter: d[8],
            facebook: d[9],
            picture: d[10],
            fullname: `${d[0]} ${d[1]}`
        };
        return Promise.resolve(team);
    };
}