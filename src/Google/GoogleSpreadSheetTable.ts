import { getRows } from "./spreadsheets";
import { camelize } from '../Utils/stringUtils';

export interface ITable<T, Store> {
    range: string;
    spreadsheetId: string;
    name: string;
    headers: string[];

    parse: (rowId: number, values: string[], store: Store) => Promise<T>;
    loadRows: (store: Store) => Promise<T[]>;
    resolve1: (store: Store) => void;
    resolve2: (store: Store) => void;
}


export interface IRow {
    rowId: number;
}

export class GoogleSpreadSheetTable<T, Store> implements ITable<T, Store>{
    public range: string;
    public spreadsheetId: string;
    public name: string;
    public headers: string[];
    public parse: (rowId: number, values: string[], store: Store) => Promise<T>;

    constructor(spreadsheetId: string, name: string) {
        this.spreadsheetId = spreadsheetId;
        this.range = `${name}!A:Z`;
        this.name = name;
    }

    get camelizedHeaders() {
        return this.headers.map(camelize);
    }
    public loadRows = async (store: Store) => {
        console.log('start load rows', this.name)
        const data = await getRows(this.spreadsheetId, this.range);
        this.headers = data.shift() || [];
        const rows = await Promise.all(data.map((d, i) => this.parse(i, d, store)));
        // return shuffle(rows)
        return rows;
    };
    // public resolve1 = (store: Store) => {
    //     const name = this.name;
    //     this.camelizedHeaders.forEach((header, i) => {
    //         const entities = store[header];
    //         if (entities) {
    //             const sources = entities.filter((entity: any) => entity[name].filter((t: any) => t.name === name).length > 0)
    //             console.log('sources', sources);
    //         }
    //     });
    // }
    public resolve1 = (store: Store) => {
        return;
    }
    public resolve2 = (store: Store) => {
        return;
    }
}

export function shuffle(array: any[]) {
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

export const useHeaderToParse = (headers: string[], rowId: number, d: string[], store: any): Promise<any> => {
    const res: any = { rowId };
    headers.forEach((header, i) => {
        const v = d[i];
        res[header] = v;
        if (store[header]) {
            res[header] = [];
        }
    });
    return res;
}