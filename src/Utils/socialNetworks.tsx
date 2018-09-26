import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { ExternalLink } from './ExternalLink';

export function socialNetwork(name: string, link: string) {
    return <ExternalLink link={link}><IconButton color="inherit"><span className={`fab fa-${name}`} /></IconButton></ExternalLink>
}

export function snTwitter(key: string) {
    return socialNetwork('twitter', `https://twitter.com/${key}`)
}
export function snLinkedin(key: string) {
    return socialNetwork('linkedin', `https://www.linkedin.com/company/${key}`)
}
export function snFacebook(key: string) {
    return socialNetwork('facebook', `https://www.facebook.com/${key}`)
}
export function snInstagram(key: string) {
    return socialNetwork('instagram', `https://www.instagram.com/${key}`)
}
export function snYoutube(key: string) {
    return socialNetwork('youtube', `https://www.youtube.com/channel/${key}`)
}
