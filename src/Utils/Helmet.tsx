import * as React from 'react';
import { IPage, IOpenGraphShare, ITwitterShare } from "./Pages/models";
import { IHappyTechStore } from "../models";
import { Helmet } from "react-helmet";


function ogTags(og: IOpenGraphShare) {
    return [
        <meta key={0} property="og:title" content={og.title} />,
        <meta key={1} property="og:description" content={og.description} />,
        <meta key={2} property="og:image" content={og.image} />,
        <meta key={3} property="og:site_name" content="HappyTech France" />,
        <meta key={4} property="og:locale" content="fr_FR" />,
        <meta key={5} property="og:type" content="website" />
    ];
    {/* <meta property="og:type" content="video.movie" /> */ }
    {/* <meta property="og:url" content={url} /> */ }
    return null;
}

function twitterTags(twitter: ITwitterShare) {
    const { title, description, image } = twitter;
    return [
        <meta key={0} name="twitter:card" content="summary" />,
        <meta key={1} name="twitter:site" content="@HappyTechFrance" />,
        <meta key={2} name="twitter:title" content={title} />,
        <meta key={3} name="twitter:description" content={description} />,
        <meta key={4} name="twitter:image" content={image} />,
        <meta key={5} name="twitter:creator" content="@HappyTechFrance" />
    ];
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
            {share && share.twitter && twitterTags(share.twitter)}
        </Helmet>
    }
    return null;
}