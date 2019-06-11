import * as React from 'react';
import * as express from 'express';
import * as fs from 'fs';
import { renderToString } from 'react-dom/server';
import html from './html';
import { getStore, deletetStoreFile } from '../Tables/Store';
// import JssProvider from 'react-jss/lib/JssProvider';
import theme from '../theme';
// import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core';
import LeftDrawer from '../Components/LeftDrawer/LeftDrawer';
import { StaticRouter, Switch } from 'react-router';
import { renderRoutes } from '../Router/Routes';
import { IHappyTechStore } from '../models';
import { allRouterPages, menuPages } from './../Utils/Pages/pages';
import { Helmet } from 'react-helmet';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { getStartupUrl, getStartup } from '../Utils/startups';
import { startupPage } from '../Components/StartupView';
import * as http from 'http';
import * as https from 'https';
import { Transform } from 'stream';
import { ThemeProvider, ServerStyleSheets } from '@material-ui/styles';

// import { request } from 'http';
const port = process.env.PORT || 9002;
// import { request } from 'https';
import { get } from 'request';
// const port = 9000;

interface IReactApp {
    body: string;
    css: string;
}
function getReactApp(store: IHappyTechStore, url: string): IReactApp {
    const sheets = new ServerStyleSheets();

    const body = renderToString(
        sheets.collect(<ThemeProvider theme={theme} >
            <StaticRouter location={url} context={{}}>
                <Switch>
                    <LeftDrawer>
                        {renderRoutes(store)}
                    </LeftDrawer>
                </Switch>
            </StaticRouter>
        </ThemeProvider>)
    );

    const css = sheets.toString();
    return { body, css };
}
const urlTo64 = (url: string) => Buffer.from(url).toString('base64');

// tslint:disable-next-line:no-var-requires
const enforce = require('express-sslify');
console.log('ENV is', process.env.NODE_ENV);
(async () => {
    const server = express();

    if (process.env.NODE_ENV === 'production') {
        server.use(enforce.HTTPS({ trustProtoHeader: true }));
    }
    server.use(express.static('client'));

    console.info('Start loading store...');
    const store = await getStore();
    allRouterPages.forEach(page => {
        server.get(`/${page.route}`, async (req, res) => {
            const ra = getReactApp(store, req.url);
            const helmet = Helmet.renderStatic();
            res.send(html({ helmet, store, ...ra }));
        })
    })

    server.get(`/reset-content`, async (req, res) => {
        deletetStoreFile();
        await getStore();
        res.send('reset-content done');
    });

    server.get(`/robots.txt`, async (req, res) => {
        res.send(`Sitemap: https://www.happytech.life/sitemap.txt
        User-agent: *
        Disallow: /sitemap.txt`);
    });

    server.get(`/sitemap.txt`, async (req, res) => {
        const menus = menuPages().map(p => p.route);
        const startups = store.startups.map(s => getStartupUrl(startupPage().route, s));
        let urls: string[] = [''];
        urls = urls.concat(menus, startups)
        res.send(urls.map(u => `https://www.happytech.life/${u}`).join('\n'));
    });


    server.get(`/startups/images/summit/:name.png`, async (req, res) => {
        try {
            const { name } = req.params;
            const startup = getStartup(store, name);
            if (startup) {
                const logo = cloudinaryTransform(`${startup.iconUrl}`, 'w_400,h_200,c_pad,f_png,b_white');
                const logoUrlBase = urlTo64(logo);
                const fetch = `l_fetch:${logoUrlBase},g_north_west,x_125,y_175,w_400,h_200`;
                const labelUrl = cloudinaryTransform('https://res.cloudinary.com/happytech/image/upload/v1539173249/website/summit/summit-bg.png', `w_650,h_650/${fetch}`);
                get(labelUrl).pipe(res);
            } else {
                throw new Error(`startup [${name}] not found : ${JSON.stringify(req.params)}`)
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    })

    // const getFileBuffer = (url: string) => {
    //     return new Promise(r => {
    //         https.request(url, (response: any) => {
    //             const data = new Transform();
    //             response.on('data', (c: any) => {
    //                 data.push(c);
    //             });
    //             response.on('error', (err: any) => {
    //                 console.error('error', err);
    //             })
    //             response.on('end', () => {
    //                 r(data.read());
    //             });
    //         }).end();
    //     })
    // }

    const download = (url: string, filename: string, ssl?: boolean) => {
        try {
            const protocol: any = ssl === true ? https : http;
            protocol.request(url, (response: any) => {
                const data = new Transform();
                response.on('data', (c: any) => {
                    data.push(c);
                });
                response.on('end', () => {
                    fs.writeFileSync(filename, data.read());
                });
            }).end();
        } catch (error) {
            console.error(error);
        }
    };

    server.get(`/startups/badges/summit-2018/a.txt`, async (req, res) => {
        try {
            const startups = [
                'comeet',
                'aura',
                'cocoworker',
                'tod',
                'yuco',
                'lyyti',
                'windoo',
                'teamstarter',
                'allsessions',
                'trainme',
                'kiplin',
                'boostyourfit',
                'eveia',
                'antimauxdedos',
                'happy-quest',
                'serenity',
                'bee',
                'melomind',
                'fidensio',
                'bleexo',
                'bloom-at-work',
                'zestmeup',
                'roti.express',
                'supermood',
                'klimat',
                'plantez-respirez',
                'artify',
                'pickr',
                'idposition',
                'monastay',
                'aurasens',
                'adilson'
            ];
            startups.forEach(async s => {

                const url = `http://localhost:9000/startups/images/badge/32mm/${s}.png`;
                const file = `/Users/pouya/Documents/poutput/o2/32mm-${s}.png`;
                download(url, file);

                const url2 = `http://localhost:9000/startups/images/badge/32mm-nobg/${s}.png`;
                const file2 = `/Users/pouya/Documents/poutput/o2/120-${s}.png`;
                download(url2, file2);

            })
            res.end('ok');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    })

    // function chunk<T>(list: T[], size: number): T[][] {
    //     return list.reduce(
    //         (all: any, one: any, i) => {
    //             const ch = Math.floor(i / size);
    //             all[ch] = [].concat((all[ch] || []), one);
    //             return all;
    //         },
    //         []);
    // }


    // function wait(t: number) {
    //     return new Promise(r => {
    //         setTimeout(r, t * 1000);
    //     })
    // }

    // const ftmp = '/tmp/map.png';
    // function save(img: sharp.Sharp, index: number) {
    //     return new Promise(r => {
    //         img.toBuffer((err, b) => {
    //             const output = `${ftmp}.${index}.png`;
    //             console.log('output', output, err)
    //             fs.writeFileSync(output, b);
    //             r(true);
    //         })
    //     })
    // }
    // server.get(`/smap/:w/:padding/:colums.png`, async (req, res) => {
    //     try {
    //         const template = 'transparent';
    //         // const startups = store.startups.splice(0, 10);
    //         // const startups = shuffle(store.startups);
    //         const startups = store.startups;
    //         let { w, colums, padding } = req.params;
    //         w = parseInt(w, 10)
    //         colums = parseInt(colums, 10)
    //         padding = parseInt(padding, 10);

    //         let max = w * colums;
    //         if (startups.length > colums * colums) {
    //             // extend one line if got more than the square
    //             max += w;
    //             colums += 1;
    //         }

    //         console.log('count', startups.length, max, colums);

    //         const iw = w - 2 * padding;

    //         const startupChunk = chunk(startups, colums);
    //         // console.log(startupChunk.map(sc => sc.length));
    //         console.log('chunk count', startupChunk.length);
    //         const chunkUrls = startupChunk.map((sc, row) => {
    //             const chunkImages = sc.map((startup, i) => {
    //                 const x = w * (i % colums);
    //                 const y = w * Math.floor(i / colums);
    //                 const logo = cloudinaryTransform(`${startup.iconUrl}`, `w_${iw},h_${iw},c_pad,f_png`);
    //                 const logoUrlBase = urlTo64(logo);
    //                 const fetch = `l_fetch:${logoUrlBase},g_north_west,x_${x + padding},y_${y + padding},w_${iw},h_${iw}`;
    //                 return fetch;
    //             })
    //             const chunkTransformations = chunkImages.join('/');
    //             // console.log(chunkTransformations)
    //             const chunkUrl = cloudinaryTransform(`https://res.cloudinary.com/happytech/image/upload/v1543333907/logos/${template}.png`, `w_${max},h_${w},f_png/${chunkTransformations}`);
    //             // console.log(chunkUrl);
    //             return chunkUrl;
    //         });


    //         // const u1: any = await getFileBuffer(chunkUrls[0]);
    //         // const u2: any = await getFileBuffer(chunkUrls[1]);
    //         // await save(sharp(u1).overlayWith(u2, { top: 0, left: 200 }), 25);

    //         // // chunkUrls.forEach((c, row) => {
    //         //     const file = `/Users/pouya/Documents/poutput/map/${row}.png`;
    //         //     setTimeout(() => {
    //         //         download(c, file, true);
    //         //     }, 1000 * row);
    //         // })
    //         // const t = `https://res.cloudinary.com/happytech/image/upload/v1543333907/logos/transparent.png`
    //         // const opts: sharp.SharpOptions = { create: { width: 300, height: 300, channels: 3, background: 'red' } };
    //         // const s1 = await getFileBuffer(u1);
    //         await sharp('/Users/pouya/Downloads/transparent.png').resize(max, startupChunk.length * w).toFile(ftmp);
    //         for (let index = 0; index < chunkUrls.length; index++) {
    //             const input = index === 0 ? ftmp : `${ftmp}.${index - 1}.png`;
    //             console.log('input', input);
    //             const img = sharp(input);
    //             const cu = chunkUrls[index];
    //             const s1: any = await getFileBuffer(cu);
    //             // console.log(s1);
    //             const opts = { top: index * w, left: 0 };
    //             // console.log(opts);
    //             await img.overlayWith(s1, opts).toFile(`${ftmp}.${index}.png`);
    //             // await save(o, index);
    //             // await wait(3);
    //         }
    //         const last = `${ftmp}.${chunkUrls.length - 1}.png`;
    //         // console.log('last', last);
    //         sharp(last).pipe(res);
    //         console.log('end');
    //         // sharp(u1).pipe(res);
    //         // img.overlayWith(u1, { top: 0, left: 0 }).extend({ bottom: 300, top: 0, left: 0, right: 0 }).overlayWith(u2, { top: 300, left: 0 }).pipe(res);
    //         // const ps = chunkUrls.map(async (cu, row) => {
    //         //     // console.log(cu, row);
    //         // });

    //         // await Promise.all(ps);
    //         // img.pipe(res);
    //         // res.sendStatus(200);
    //         // const chunkUrls = ['']
    //         // const rowFetchTransformation = chunkUrls.map((rowUrl, row) => {
    //         //     const y = w * row;
    //         //     const logoUrlBase = urlTo64(rowUrl);
    //         //     const fetchUrl = `l_fetch:${logoUrlBase},g_north_west,x_0,y_${y},w_${max},h_${w}`;
    //         //     // console.log(fetchUrl);
    //         //     return fetchUrl;
    //         // }).join('/')
    //         // const mapUrl = cloudinaryTransform(`https://res.cloudinary.com/happytech/image/upload/v1543333907/logos/${template}.png`, `w_${max},h_${max}/${rowFetchTransformation}`);

    //         // console.log(chunkUrls[0].length, mapUrl.length);
    //         // get(mapUrl).on('error', (e => {
    //         //     console.error('error', e);
    //         //     res.send(e);
    //         // })).pipe(res);
    //         // get(chunkUrls[0]).pipe(res);

    //         // const startup = getStartup(store, name);
    //         // if (startup) {
    //         //     const logo = cloudinaryTransform(`${startup.iconUrl}`, `w_${w},h_${h},c_pad,f_png,b_white`);
    //         //     const logoUrlBase = urlTo64(logo);
    //         //     const fetch = `l_fetch:${logoUrlBase},g_north_west,x_110,y_150,w_${w},h_${h}`;
    //         //     const labelUrl = cloudinaryTransform(`https://res.cloudinary.com/happytech/image/upload/v1543320907/logos/${template}.png`, `w_512,h_512/${fetch}`);
    //         //     get(labelUrl).pipe(res);
    //         // } else {
    //         //     throw new Error(`startup [${name}] not found : ${JSON.stringify(req.params)}`)
    //         // }
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send(err.message);
    //     }
    // })

    server.get(`/startups/images/badge/:template/:name.png`, async (req, res) => {
        try {
            const { name, template } = req.params;
            const [w, h] = [292, 204]
            const startup = getStartup(store, name);
            if (startup) {
                const logo = cloudinaryTransform(`${startup.iconUrl}`, `w_${w},h_${h},c_pad,f_png,b_white`);
                const logoUrlBase = urlTo64(logo);
                const fetch = `l_fetch:${logoUrlBase},g_north_west,x_110,y_150,w_${w},h_${h}`;
                const labelUrl = cloudinaryTransform(`https://res.cloudinary.com/happytech/image/upload/v1543320907/logos/${template}.png`, `w_512,h_512/${fetch}`);
                get(labelUrl).pipe(res);
            } else {
                throw new Error(`startup [${name}] not found : ${JSON.stringify(req.params)}`)
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    })

    server.get(`/startups/images/badge/:template/:name.png`, async (req, res) => {
        try {
            const { name, template } = req.params;
            const [w, h] = [292, 204]
            const startup = getStartup(store, name);
            if (startup) {
                const logo = cloudinaryTransform(`${startup.iconUrl}`, `w_${w},h_${h},c_pad,f_png,b_white`);
                const logoUrlBase = urlTo64(logo);
                const fetch = `l_fetch:${logoUrlBase},g_north_west,x_110,y_150,w_${w},h_${h}`;
                const labelUrl = cloudinaryTransform(`https://res.cloudinary.com/happytech/image/upload/v1543320907/logos/${template}.png`, `w_512,h_512/${fetch}`);
                get(labelUrl).pipe(res);
            } else {
                throw new Error(`startup [${name}] not found : ${JSON.stringify(req.params)}`)
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    })

    server.get(`*`, async (req, res) => {
        res.status(404).redirect('/')
    });

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
