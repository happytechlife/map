import * as shutdown from 'showdown';
import * as presentationMarkdown from './../../Markdowns/presentation.md';
import * as happytechsummitMarkdown from './../../Markdowns/happytechsummit.md';
import { IMarkdownPage, IPage, IReactPage, IMetaHeaders } from './models';
import Help from '@material-ui/icons/Help';

import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { teamPage } from '../../Components/Team';
import { eventsPage } from '../../Components/Events';
import { startupsPage } from '../../Components/Startups';
import { startupPage } from '../../Components/StartupView';
import { partnersPage } from '../../Components/Partners';
import { pressePage } from '../../Components/Presse';
import { entreprisesPage } from '../../Components/Enterprises';
import { contactPage } from '../../Components/Contact';
import { cloudinaryTransform } from '../Cloudinary';
import { googleMapPage } from '../../MapClusters/GoogleMapPage';
import { tagsPage } from '../../Components/Tags';

export function getHtml(input: string) {
    const classMap = {}
    const bindings = Object.keys(classMap)
        .map(key => {
            const v = classMap[key];
            return {
                type: 'output',
                regex: new RegExp(`<${key}(.*)>`, 'g'),
                replace: `<${v.key} classes="${v}" $1>`
            };
        });
    const binds: any = bindings;
    const converter = new shutdown.Converter({
        extensions: [...binds]
    });
    converter.setOption('noHeaderId', false);
    return converter.makeHtml(input);
}

const presentation = {
    menuTitle: 'Qu’est-ce que la HappyTech ?',
    icon: Help,
    route: 'presentation',
    html: getHtml(presentationMarkdown),
    headers: () => getHeaders("HappyTech, L'innovation technologique au service du bien-être en entreprise.")
};

const summit = {
    menuTitle: 'HappyTech Summit 2018',
    icon: InsertEmoticon,
    route: 'summit',
    html: getHtml(happytechsummitMarkdown),
    headers: () => {
        const h = getHeaders("HappyTech Summit 2018, Inscrivez-vous vite à la plus grande concentration d'innovations technologiques au service du bien-être en entreprise");
        h.description = "Le HappyTech Summit est le 1er événement en France qui réunit l’ensemble des innovations technologiques dédiées au bien-être en entreprise. Ce rendez-vous est réservé aux professionnels cherchant à trouver des solutions clés en main pour leurs initiatives de bien-être en entreprise. Plus de 40 startups seront réunies pour présenter toutes les dernières innovations et solutions en 6 villages thématiques"
        if (h.share) {
            h.share.og.image = 'https://res.cloudinary.com/happytech/image/upload/v1539944008/Summit/social-network.png'
            h.share.og.description = h.description;
            h.share.twitter.image = 'https://res.cloudinary.com/happytech/image/upload/v1539944009/Summit/twitter.png';
            h.share.twitter.description = h.description;
            h.share.twitter.card = 'summary_large_image';
        }
        return h;
    }
};

export const homePage = { ...presentation, route: '/' };
export function getHeaders(title: string, description?: string): IMetaHeaders {
    description = description || "HappyTech, L'innovation technologique au service du bien-être en entreprise.";
    const image = 'https://res.cloudinary.com/happytech/image/upload/v1537883204/happytech-logo.png'
    return {
        title,
        description,
        meta: {
            title,
            description,
            tags: 'qvt, bien-être, intelligence artificielle'
        },
        share: {
            twitter: {
                title, description,
                image: cloudinaryTransform(image, 'w_512,h_512,c_pad,f_png,b_white'),
                card: 'summary'
            },
            og: {
                title, description,
                image: cloudinaryTransform(image, 'w_1200,h_630,c_pad,f_png,b_white'),
            }
        }
    };
}

export const markdownPages: IMarkdownPage[] = [
    presentation, homePage, summit
]

export const reactPages = (): IReactPage[] => ([
    tagsPage(), googleMapPage(), startupsPage(), entreprisesPage(), partnersPage(), eventsPage(), pressePage(), teamPage(), startupPage(), contactPage()
])
export const menuPages = (): IPage[] => ([
    presentation, startupsPage(), entreprisesPage(), eventsPage(), teamPage(), partnersPage(), summit, pressePage(), contactPage(), googleMapPage()
]);
export const allRouterPages: IPage[] = [
    ...markdownPages, ...reactPages()
]
