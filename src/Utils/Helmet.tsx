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
            return <React.Fragment>
                <meta property="og:title" content={m.title} />
                <meta property="og:description" content={m.description} />
                {/* <meta property="og:type" content="video.movie" /> */}
                {/* <meta property="og:url" content={url} /> */}
                <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
            </React.Fragment>
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