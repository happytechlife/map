import { IRow } from "../../Google/GoogleSpreadSheetTable";

type PagesName = 'presentation' | 'entreprises';
export type MarkdownPages = Record<PagesName, IMarkdownPage>

type MapEntityToString = (a?: IRow) => string;

export interface IPage {
    route: string;
    menuTitle: string;
    icon?: any;
    headers: {
        title: MapEntityToString;
    }
}



export interface IReactPage extends IPage {
    component: any;
}

export interface IMarkdownPage extends IPage {
    html: string;
    // route: string;
    // menuTitle: string;
    // icon?: any;
    // headers: {
    //     title: string;
    // }
}

