import * as shutdown from 'showdown';
import * as presentationMarkdown from './../../Markdowns/presentation.md';
import * as entreprisesMarkdown from './../../Markdowns/entreprises.md';
import { IMarkdownPage, IPage, IReactPage } from './models';
import Help from '@material-ui/icons/Help';
import People from '@material-ui/icons/People';
import AccountBalance from '@material-ui/icons/AccountBalance';
import ViewModule from '@material-ui/icons/ViewModule';
import { Startups } from '../../Components/Startups';
import { Team } from '../../Components/Team';
import StartupView from '../../Components/StartupView';
import { IStartup } from '../../models';

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
    menuTitle: 'Qu’est-ce que la Happytech ?',
    icon: Help,
    route: 'presentation',
    html: getHtml(presentationMarkdown),
    headers: {
        title: () => 'Qu’est-ce que la Happytech ?'
    }
};

export const homePage = { ...presentation, route: '/' };

const entreprises = {
    menuTitle: 'Les entreprises',
    icon: AccountBalance,
    route: 'entreprises',
    html: getHtml(entreprisesMarkdown),
    headers: {
        title: () => 'Les entreprises de la HappyTech'
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

const startup: IReactPage = {
    menuTitle: '--',
    route: 'startups/:name',
    component: StartupView,
    headers: {
        title: (s: IStartup) => s && `La super startup ${s.name}`
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
    presentation, entreprises, homePage
]

export const reactPages: IReactPage[] = [
    startups, startup, equipe
]
export const menuPages: IPage[] = [
    presentation, startups, entreprises, equipe
];
export const allRouterPages: IPage[] = [
    ...markdownPages, ...reactPages
]
