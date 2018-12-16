import * as shutdown from 'showdown';
import * as presentationMarkdown from './../../Markdowns/presentation.md';
import * as swissMarkdown from './../../Markdowns/swiss.md';
import { IMarkdownPage, IPage, IReactPage, IMetaHeaders } from './models';
import Help from '@material-ui/icons/Help';
import Language from '@material-ui/icons/Language';
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
import { quotePage } from '../../Components/Quotes';
import { summitPage } from '../../Components/Summit';

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

const happytechSwiss = {
    menuTitle: 'Suisse',
    icon: Language,
    route: 'swiss',
    html: getHtml(swissMarkdown),
    headers: () => getHeaders("HappyTech Swiss, L'innovation technologique au service du bien-être en entreprise.")
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
    presentation, homePage, happytechSwiss
]

export const reactPages = (): IReactPage[] => ([
    tagsPage(), googleMapPage(), startupsPage(), entreprisesPage(), partnersPage(), eventsPage(), pressePage(), teamPage(), startupPage(), contactPage(), summitPage(), quotePage()
])
export const menuPages = (): IPage[] => ([
    presentation, startupsPage(), entreprisesPage(), eventsPage(), teamPage(), partnersPage(), summitPage(), pressePage(), contactPage(), googleMapPage(), happytechSwiss
]);
export const allRouterPages: IPage[] = [
    ...markdownPages, ...reactPages()
]
