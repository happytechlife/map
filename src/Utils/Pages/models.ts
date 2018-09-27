import { IHappyTechStore } from "../../models";

type PagesName = 'presentation' | 'entreprises';
export type MarkdownPages = Record<PagesName, IMarkdownPage>

type MapEntityToString = (store?: IHappyTechStore, params?: any) => string;

export interface IPage {
    route: string;
    menuTitle: string;
    icon?: any;
    headers: {
        title: MapEntityToString;
        description?: MapEntityToString;
    }
}

export interface IReactPageProps {
    store: IHappyTechStore;
    page: IReactPage;
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

