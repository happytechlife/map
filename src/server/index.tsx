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
import { allRouterPages, menuPages } from './../Utils/Pages/pages';
import { Helmet } from 'react-helmet';
import Jimp = require('jimp');
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { toImageMime } from './images';
import { getStartupUrl, getStartup } from '../Utils/startups';
import { startupPage } from '../Components/StartupView';
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

        server.get(`/robots.txt`, async (req, res) => {
            res.send('Sitemap: https://www.happytech.life/sitemap.txt');
        });

        server.get(`/sitemap.txt`, async (req, res) => {
            const menus = menuPages().map(p => p.route);
            const startups = store.startups.map(s => getStartupUrl(startupPage().route, s));
            let urls: string[] = [''];
            urls = urls.concat(menus, startups)
            res.send(urls.map(u => `https://www.happytech.life/${u}`).join('\n'));
        });
        server.get(`/startups/:name/logos/label.png`, async (req, res) => {
            const labelUrl = 'https://res.cloudinary.com/happytech/image/upload/v1538084191/logos/label.png';
            console.log(req.params);
            const { name } = req.params;
            const startup = getStartup(store, name);

            if (startup) {
                const logoUrl = cloudinaryTransform(startup.iconUrl, 'w_650,h_650,c_scale,f_png,bg_white');
                const icon = await Jimp.read(logoUrl);
                // icon = icon.scaleToFit(650, 650, Jimp.RESIZE_BEZIER);
                let label = await Jimp.read(labelUrl);
                label = label.composite(icon, 1170, 128);
                return toImageMime(res, icon);
            }
        })

        server.get(`/startups/images/summit/:name.png`, async (req, res) => {

            try {
                const labelUrl = cloudinaryTransform('https://res.cloudinary.com/happytech/image/upload/v1539173249/website/summit/summit-bg.png', 'w_650,h_650');
                console.log(req.params);
                const { name } = req.params;
                const startup = getStartup(store, name);
                if (startup) {
                    const logoUrl = cloudinaryTransform(`${startup.iconUrl}`, 'w_400,h_200,c_pad,f_png,b_white');
                    console.log(logoUrl);
                    let icon = await Jimp.read(logoUrl);
                    icon = icon.scaleToFit(400, 200);
                    console.log('icon', icon);
                    let label = await Jimp.read(labelUrl);
                    label = label.composite(icon, 125, 175);
                    return toImageMime(res, label);
                }
                throw new Error(`startup [${name}] not found : ${JSON.stringify(req.params)}`)
            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        })

        server.get(`/${page.route}`, async (req, res) => {
            const ra = getReactApp(store, req.url);
            const helmet = Helmet.renderStatic();
            res.send(html({ helmet, store, ...ra }));
        })
    })

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
