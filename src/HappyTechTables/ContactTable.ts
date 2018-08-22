import { IContact } from "../models";
import { GoogleSpreadSheetTable } from "../Google/GoogleSpreadSheetTable";
import { IHappyTechStore } from "./Store";

export class ContactTable extends GoogleSpreadSheetTable<IContact, IHappyTechStore>{
    constructor(spreadsheetId: string) {
        super(spreadsheetId, 'contacts!A2:H')
    }
    public parse = (rowId: number, d: string, store: IHappyTechStore): Promise<IContact> => {
        const contact = { rowId, starup_name: d[0], firstname: d[1], lastname: d[2], email: d[3] };
        const startup = store.startups.find(s => s.name === contact.starup_name);
        if (startup) {
            startup.contacts.push(contact);
        }
        return Promise.resolve({ ...contact, startup });
    };
}