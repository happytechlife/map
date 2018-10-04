import * as React from 'react';
import { IPage, IOpenGraphShare, ITwitterShare } from "./Pages/models";
import { IHappyTechStore } from "../models";
import { Helmet } from "react-helmet";

function ogTags(og: IOpenGraphShare) {
    return [
        <meta key={0} property="og:title" content={og.title} />,
        <meta key={1} property="og:description" content={og.description} />,
        <meta key={2} property="og:image" content={og.image} />,
        <meta key={3} property="og:site_name" content="HappyTech" />,
        <meta key={4} property="og:locale" content="fr_FR" />,
        <meta key={5} property="og:type" content="website" />
    ];
    return null;
}

function twitterTags(twitter: ITwitterShare) {
    const { title, description, image, card } = twitter;
    return [
        <meta key={0} name="twitter:card" content={card} />,
        <meta key={1} name="twitter:site" content="@HappyTechFrance" />,
        <meta key={2} name="twitter:title" content={title} />,
        <meta key={3} name="twitter:description" content={description} />,
        <meta key={4} name="twitter:image" content={image} />,
        <meta key={5} name="twitter:creator" content="@HappyTechFrance" />
    ];
    return null;
}


const ldJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://www.happytech.life",
    "brand": "HappyTech",
    "sameAs": [
        "https://twitter.com/happytechfrance",
        "https://www.facebook.com/happytech.life",
        "https://www.linkedin.com/company/happytech",
        "https://www.instagram.com/happytech.life",
        "https://www.youtube.com/channel/UCaGZlvSIGVetXWzVR5CwdwA"],
    "@id": "https://www.happytech.life/#organization",
    "name": "HappyTech",
    "logo": "https://res.cloudinary.com/happytech/image/upload/v1537883204/happytech-logo.png",
    "image": [
        "https://res.cloudinary.com/happytech/image/upload/v1537883204/happytech-logo.png"
    ]
};

export function helmet(page: IPage, store?: IHappyTechStore, params?: any) {
    if (store && page) {
        const { headers } = page;
        const { title, description, share, linkedData } = headers(store, params);
        return <Helmet>
            <title>{title}</title>
            {<meta name="description" content={description} />}
            {share && share.og && ogTags(share.og)}
            {share && share.twitter && twitterTags(share.twitter)}
            <script type='application/ld+json'>{JSON.stringify(ldJson)}</script>
            {linkedData && linkedData.map((ld, i) =>
                <script type='application/ld+json' key={i}>{JSON.stringify(ld)}</script>
            )}
        </Helmet>
    }
    return null;
}