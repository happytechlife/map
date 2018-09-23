import * as React from 'react';
import { IconButton } from '@material-ui/core';

export function socialNetwork(name: string, link: string) {
    return <a href={link} target="_blank" style={{ textDecoration: 'none', color: '#6C6C6C' }}><IconButton color="inherit"><span className={`fab fa-${name}`} /></IconButton></a>
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
