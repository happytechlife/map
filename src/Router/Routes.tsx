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
        {/* <Route exact={true} path={'/map'} component={() => <GoogleMap store={store} />} /> */}
        {/* {store && <React.Fragment> */}
        {/* <Route exact={true} path={'/tags'} component={() => <Tags store={store} />} />
            <Route exact={true} path={'/startups'} component={() => <Startups store={store} />} />
            <Route exact={true} path={'/startups/:name'} component={(p: IParams) => <StartupView store={store} name={p.match.params.name} />} /> */}
        {/* </React.Fragment>} */}
        {/* <Route exact={true} path={'/options'} component={() => <Options store={store} />} /> */}
        {/* <Route exact={true} path={'/startups_chord'} component={() => <StartupsChordDiagramWithTags store={store} />} /> */}
        {/* <Route exact={true} path={'/presentation'} component={() => <Presentation store={store} />} /> */}
        {getReactPagesRoutes(store)}
        {getMarkdownPagesRoutes(store)}
        {/* <Route exact={true} path={'/'} component={() => <Markdown html={pages.presentation.html} store={store} />} /> */}

    </React.Fragment>
}