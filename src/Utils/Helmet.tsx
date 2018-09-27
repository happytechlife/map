import * as React from 'react';
import { IPage } from "./Pages/models";
import { IHappyTechStore } from "../models";
import { Helmet } from "react-helmet";

export function helmet(page: IPage, store?: IHappyTechStore) {
    if (store && page) {
        const { headers } = page;
        return <Helmet>
            <title>{headers.title(store)}</title>
            {headers.description && <meta name="description" content={headers.description(store)} />}
        </Helmet>
    }
    return null;
}