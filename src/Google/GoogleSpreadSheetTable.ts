import { getRows } from "./spreadsheets";

export interface ITable<T, Store> {
    range: string;
    spreadsheetId: string;

    parse: (rowId: number, values: string, store: Store) => Promise<T>;
}


export interface IRow {
    rowId: number;
}

export class GoogleSpreadSheetTable<T, Store> implements ITable<T, Store>{
    public parse: (rowId: number, values: string, store: Store) => Promise<T>;
    public range: string;
    public spreadsheetId: string;

    constructor(spreadsheetId: string, range: string) {
        this.spreadsheetId = spreadsheetId;
        this.range = range;
    }
    public loadRows = async (store: Store) => {
        const data = await getRows(this.spreadsheetId, this.range);
        // const data: string[] = Array.from(await );
        const rows = await Promise.all(data.map((d, i) => this.parse(i, d, store)));
        return shuffle(rows)
    };
}

function shuffle(array: any[]) {
    let m = array.length;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        const i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        const t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
