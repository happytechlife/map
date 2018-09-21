

import * as shutdown from 'showdown';
import presentationMarkdown from './markdowns/presentation.md';
import entreprisesMarkdown from './markdowns/entreprises.md';
import { MarkdownPages } from './models';
import Help from '@material-ui/icons/Help';
import AccountBalance from '@material-ui/icons/AccountBalance';


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
        title: 'Qu’est-ce que la Happytech ?'
    }
};

const entreprises = {
    menuTitle: 'Les entreprises',
    icon: AccountBalance,
    route: 'entreprises',
    html: getHtml(entreprisesMarkdown),
    headers: {
        title: 'Les entreprises HappyTech'
    }
};

export const pages: MarkdownPages = {
    presentation, entreprises
}