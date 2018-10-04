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


interface ILinkedData {
    "@context": "http://schema.org",
}


interface ILinkedDataBreadCrumbListElement {
    "@type": "ListItem",
    position: number,
    name: string,
    item: string
}
export interface ILinkedDataBreadCrumb extends ILinkedData {

    "@type": "BreadcrumbList",
    itemListElement: ILinkedDataBreadCrumbListElement[];
}

export interface ILinkedDataProduct extends ILinkedData {
    "@type": "Product",
    name: string;
    image: string[];
    description: string;
    brand: {
        "@type": "Thing",
        name: string
    }

}

export type AnyLinkedData = ILinkedDataBreadCrumb | ILinkedDataProduct;

export interface IMetaHeaders {
    title: string;
    description: string;
    meta?: IMetaTag;
    share?: {
        twitter: ITwitterShare,
        og: IOpenGraphShare
    }
    linkedData?: AnyLinkedData[]

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

