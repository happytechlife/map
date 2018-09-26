import * as shutdown from 'showdown';
import * as presentationMarkdown from './../../Markdowns/presentation.md';
import * as happytechsummitMarkdown from './../../Markdowns/happytechsummit.md';
import { IMarkdownPage, IPage, IReactPage } from './models';
import Help from '@material-ui/icons/Help';
import People from '@material-ui/icons/People';
import BookIcon from '@material-ui/icons/Book';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import AccountBalance from '@material-ui/icons/AccountBalance';
import EventIcon from '@material-ui/icons/Event';
import SyncIcon from '@material-ui/icons/Sync';
import ViewModule from '@material-ui/icons/ViewModule';
import { Startups } from '../../Components/Startups';
import { Team } from '../../Components/Team';
import StartupView from '../../Components/StartupView';
import { IHappyTechStore } from '../../models';
import { Entreprises } from '../../Components/Enterprises';
import { startupLinkName } from '../../Components/StartupCard';
import { Partners } from '../../Components/Partners';
import Events from '../../Components/Events';
import { PresseGrid } from '../../Components/Presse';

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
    headers: {
        title: () => "HappyTech, L'innovation technologique au service du bien-être en entreprise."
    }
};

const summit = {
    menuTitle: 'HappyTech Summit',
    icon: InsertEmoticon,
    route: 'summit',
    html: getHtml(happytechsummitMarkdown),
    headers: {
        title: () => "HappyTech Summit, La plus grande concentration d'innovations technologique au service du bien-être en entreprise dans le monde."
    }
};

export const homePage = { ...presentation, route: '/' };

const entreprises: IReactPage = {
    menuTitle: 'Les entreprises',
    icon: AccountBalance,
    route: 'entreprises',
    component: Entreprises,
    headers: {
        title: () => 'Les entreprises de la HappyTech'
    }
};

const presse: IReactPage = {
    menuTitle: 'Presse',
    icon: BookIcon,
    route: 'presse',
    component: PresseGrid,
    headers: {
        title: () => 'La HappyTech dans la presse'
    }
};

const partners: IReactPage = {
    menuTitle: 'Les partenaires',
    icon: SyncIcon,
    route: 'partenaires',
    component: Partners,
    headers: {
        title: () => 'Les partenaires de la HappyTech'
    }
};

const events: IReactPage = {
    menuTitle: 'Retrouvez-nous',
    icon: EventIcon,
    route: 'evenements',
    component: Events,
    headers: {
        title: () => 'Les évenemnts de la HappyTech'
    }
};

const startups: IReactPage = {
    menuTitle: 'Les startups',
    icon: ViewModule,
    route: 'startups',
    component: Startups,
    headers: {
        title: () => 'Les startups de la HappyTech'
    }
}

const startupPage: IReactPage = {
    menuTitle: '--',
    route: 'startups/:name',
    component: StartupView,
    headers: {
        title: (store: IHappyTechStore, params: { name: string }) => {
            const { name } = params;
            const startup = store.startups.find(s => startupLinkName(s) === name.toLocaleLowerCase())
            return startup ? `La super startup ${startup.name}` : '<no-startup>'
        }
    }
}

const equipe: IReactPage = {
    menuTitle: 'L\'équipe',
    route: 'team',
    icon: People,
    component: Team,
    headers: {
        title: () => `L'équipe HappyTech`
    }
}

export const markdownPages: IMarkdownPage[] = [
    presentation, homePage, summit
]

export const reactPages: IReactPage[] = [
    startups, startupPage, equipe, entreprises, partners, events, presse
]
export const menuPages: IPage[] = [
    presentation, startups, entreprises, equipe, events, partners, summit, presse
];
export const allRouterPages: IPage[] = [
    ...markdownPages, ...reactPages
]
