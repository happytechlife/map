import * as React from 'react';
import { Route } from 'react-router';
import { IHappyTechStore } from "./../models";
// import { Startups } from '../Components/Startups';
// import { Tags } from '../Components/Tags';
// import StartupView from '../Components/StartupView';
import { Markdown } from '../Utils/Pages/Markdown';
import { markdownPages, reactPages } from '../Utils/Pages/pages';

interface IParams {
    match: {
        params: any
    }
}

function getMarkdownPagesRoutes(store?: IHappyTechStore) {
    return Object.keys(markdownPages).map(name => {
        const page = markdownPages[name];
        return <Route key={page.route} exact={true} path={`/${page.route}`} component={() => <Markdown html={page.html} store={store} />} />
    })
}

function getReactPagesRoutes(store?: IHappyTechStore) {
    return reactPages.map(page => {
        return <Route key={page.route} exact={true} path={`/${page.route}`} component={(props: IParams) => <page.component {...props.match.params} store={store} />} />
    })
}
export const renderRoutes = (store?: IHappyTechStore) => {
    return <React.Fragment>
        {getReactPagesRoutes(store)}
        {getMarkdownPagesRoutes(store)}
    </React.Fragment>
}