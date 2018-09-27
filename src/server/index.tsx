import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import html from './html';
import { getStore } from '../Tables/Store';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'jss';
import theme from '../theme';
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core';
import LeftDrawer from '../Components/LeftDrawer/LeftDrawer';
import { StaticRouter, Switch } from 'react-router';
import { renderRoutes } from '../Router/Routes';
import { IHappyTechStore } from '../models';
import { allRouterPages } from './../Utils/Pages/pages';
import { Helmet } from 'react-helmet';
import { startupLinkName } from '../Components/StartupCard';

const port = process.env.PORT || 9000;
// const port = 9000;


interface IReactApp {
    body: string;
    css: string;
}
function getReactApp(store: IHappyTechStore, url: string): IReactApp {
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const generateClassName = createGenerateClassName();

    const body = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <StaticRouter location={url} context={{}}>
                    <Switch>
                        <LeftDrawer>
                            {renderRoutes(store)}
                        </LeftDrawer>
                    </Switch>
                </StaticRouter>
            </MuiThemeProvider>
        </JssProvider>
    );

    const css = sheetsRegistry.toString();
    return { body, css };
}


(async () => {
    const server = express();
    server.use(express.static('client'));

    console.info('Start loading store...');
    const store = await getStore();


    allRouterPages.forEach(page => {
        server.get(`/startups/:name/logos/label.png`, async (req, res) => {
            console.log(req.params);
            const { name } = req.params;
            const startup = store.startups.find(s => startupLinkName(s) === name.toLocaleLowerCase())
            if (startup) {

            }
            res.send('coucou');
        })


        server.get(`/${page.route}`, async (req, res) => {
            const ra = getReactApp(store, req.url);
            const helmet = Helmet.renderStatic();
            res.send(html({ helmet, store, ...ra }));
        })
    })

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
