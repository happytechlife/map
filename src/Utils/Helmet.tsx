import * as React from 'react';
import { IPage } from "./Pages/models";
import { IHappyTechStore } from "../models";
import { Helmet } from "react-helmet";


function ogTags(page: IPage, store?: IHappyTechStore, params?: any) {
    const { headers } = page;
    if (headers) {
        const { meta } = headers;
        if (meta) {
            const m = meta(store, params);
            return [
                <meta key={0} property="og:title" content={m.title} />,
                <meta key={1} property="og:description" content={m.description} />,
                <meta key={2} property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
            ];
            {/* <meta property="og:type" content="video.movie" /> */ }
            {/* <meta property="og:url" content={url} /> */ }
        }
    }
    return null;
}

export function helmet(page: IPage, store?: IHappyTechStore, params?: any) {
    if (store && page) {
        const { headers } = page;
        return <Helmet>
            <title>{headers.title(store)}</title>
            {headers.description && <meta name="description" content={headers.description(store)} />}
            {ogTags(page, store, params)}
        </Helmet>
    }
    return null;
}