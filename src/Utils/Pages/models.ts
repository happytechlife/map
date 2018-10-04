import { IHappyTechStore } from "../../models";

type PagesName = 'presentation' | 'entreprises';
export type MarkdownPages = Record<PagesName, IMarkdownPage>

type MapEntityToHeaders = (store?: IHappyTechStore, params?: any) => IMetaHeaders;

interface IMetaTag {
    tags: string;
    description: string;
    title: string;
}

export interface ITwitterShare {
    title: string;
    description: string;
    image: string;

    card: 'summary' | 'summary_large_image'
}

export interface IOpenGraphShare {
    title: string;
    description: string;
    image: string;
}

export interface IMetaHeaders {
    title: string;
    description: string;
    meta?: IMetaTag;
    share?: {
        twitter: ITwitterShare,
        og: IOpenGraphShare
    }
}
export interface IPage {
    route: string;
    menuTitle: string;
    icon?: any;
    headers: MapEntityToHeaders;
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

