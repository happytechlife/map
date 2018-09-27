import * as React from 'react';
import { IPage, IOpenGraphShare } from "./Pages/models";
import { IHappyTechStore } from "../models";
import { Helmet } from "react-helmet";


function ogTags(og: IOpenGraphShare) {
    return [
        <meta key={0} property="og:title" content={og.title} />,
        <meta key={1} property="og:description" content={og.description} />,
        <meta key={2} property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
    ];
    {/* <meta property="og:type" content="video.movie" /> */ }
    {/* <meta property="og:url" content={url} /> */ }
    return null;
}

export function helmet(page: IPage, store?: IHappyTechStore, params?: any) {
    if (store && page) {
        const { headers } = page;
        const { title, description, share } = headers(store, params);
        return <Helmet>
            <title>{title}</title>
            {<meta name="description" content={description} />}
            {share && share.og && ogTags(share.og)}
        </Helmet>
    }
    return null;
}