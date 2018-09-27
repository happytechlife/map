import { IHappyTechStore } from "../../models";

type PagesName = 'presentation' | 'entreprises';
export type MarkdownPages = Record<PagesName, IMarkdownPage>

type MapEntityToString = (store?: IHappyTechStore, params?: any) => string;
type MapEntityToMetaTag = (store?: IHappyTechStore, params?: any) => IMetaTag;

interface IMetaTag {
    tags: string;
    description: string;
    title: string;
}

interface ITwitterShare {
    title: MapEntityToString;
    description: MapEntityToString;
}
export interface IPage {
    route: string;
    menuTitle: string;
    icon?: any;
    headers: {
        title: MapEntityToString;
        description?: MapEntityToString;
        meta?: MapEntityToMetaTag;
        share?: {
            twitter: ITwitterShare,
            og: ITwitterShare
        }
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

