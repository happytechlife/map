import { IEvent, IStartup } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "../models";
import * as moment from "moment";

export class EventTable extends GoogleSpreadSheetTable<IEvent, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'events')
    }
    public parse = (rowId: number, d: string[], store: IHappyTechStore): Promise<IEvent> => {
        const event = {
            rowId,
            name: d[0],
            description: d[1],
            startupNames: d[2].split(',').map(s => s.trim()),
            dateString: d[3],
            time: d[4],
            location: d[5],
            address: d[6],
            logo: d[7],
            registerLink: d[8]
        };
        return Promise.resolve(event);
    };
    public resolve2 = (store: IHappyTechStore) => {
        store.events = store.events.map(e => {
            e.startups = e.startupNames.map(sn => store.startups.find(s => s.name === sn)).filter(Object) as IStartup[];
            e.date = moment(e.dateString, 'DD/MM/YYYY');
            return e;
        })
    }
}
