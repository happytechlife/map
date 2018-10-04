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
    headers: () => ({
        title: "HappyTech, L'innovation technologique au service du bien-être en entreprise.",
        description: ''
    })
};

const summit = {
    menuTitle: 'HappyTech Summit 2018',
    icon: InsertEmoticon,
    route: 'summit',
    html: getHtml(happytechsummitMarkdown),
    headers: () => ({
        title: "HappyTech Summit, La plus grande concentration d'innovations technologique au service du bien-être en entreprise dans le monde.",
        description: ''
    })
};

export const homePage = { ...presentation, route: '/' };

export function getHeaders(title: string): IMetaHeaders {
    const description = "HappyTech, L'innovation technologique au service du bien-être en entreprise.";
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
                title, description, image,
                card: 'summary'
            },
            og: {
                title, description, image
            }
        }
    };
}

export const markdownPages: IMarkdownPage[] = [
    presentation, homePage, summit
]

export const reactPages = (): IReactPage[] => ([
    startupsPage(), entreprisesPage(), partnersPage(), eventsPage(), pressePage(), teamPage(), startupPage(), contactPage()
])
export const menuPages = (): IPage[] => ([
    presentation, startupsPage(), entreprisesPage(), eventsPage(), teamPage(), partnersPage(), summit, pressePage(), contactPage()
]);
export const allRouterPages: IPage[] = [
    ...markdownPages, ...reactPages()
]
