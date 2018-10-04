import * as React from 'react';
import { IHappyTechStore } from "./../models";
import Typography from '@material-ui/core/Typography';
import { Chip, List, withStyles, Paper, Hidden } from '@material-ui/core';

import './StartupCard';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { Contact, startupLinkName } from './StartupCard';
import { snTwitter, snFacebook, snLinkedin, snYoutube, snInstagram } from '../Utils/socialNetworks';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { startupsPage } from './Startups';
interface IP {
    store: IHappyTechStore;
    name: string;
    classes: any;
}

type IProps = IP & IReactPageProps;

const styles: any = (theme: any) => ({
    card: {
        display: 'flex',
        // height: 152,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        maxWidth: 300
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    content: {
        flex: '1 0 auto',
        alignItems: 'left'
    },
    cover: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});
class StartupView extends React.Component<IProps, {}> {
    public render() {
        const { store, name, page } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        const startup = startups.find(s => startupLinkName(s) === name.toLocaleLowerCase())
        if (startup) {
            const { socialNetwork, pitch } = startup;
            const logo = cloudinaryTransform(startup.iconUrl, 'w_300,c_fit');
            return <Paper style={{ margin: 16, padding: 16 }}>
                {page && helmet(page, store, { name })}
                <Hidden smDown={true}>
                    {logo && <img src={logo} style={{ margin: 24 }} />}
                </Hidden>
                <Typography variant="display2" align="center" color="textPrimary" gutterBottom={true}>
                    {startup.name}
                </Typography>
                <Typography variant="title" align="center" color="textSecondary" paragraph={true} >
                    {startup.description}
                </Typography>
                <List>{startup.tags.map((t, i) => <Chip key={i} label={t.name} style={{ margin: 2 }} />)}</List>
                <Typography variant="caption" align="center" >{startup.address}</Typography>
                <List>{startup.contacts.map(Contact)}</List>
                {socialNetwork && <div>
                    {socialNetwork.twitter && snTwitter(socialNetwork.twitter)}
                    {socialNetwork.facebook && snFacebook(socialNetwork.facebook)}
                    {socialNetwork.linkedIn && snLinkedin(socialNetwork.linkedIn)}
                    {socialNetwork.youTube && snYoutube(socialNetwork.youTube)}
                    {socialNetwork.instagram && snInstagram(socialNetwork.instagram)}
                </div>}
                {pitch && <div className="md-children" style={{ textAlign: 'left' }}>
                    <h2 className="title">Présentation</h2>
                    <p>{pitch.presentation}</p>
                    <h2 className="title">Problématiques adressées</h2>
                    <p>{pitch.problems}</p>
                    <h2 className="title">Chiffres clés</h2>
                    <p>{pitch.numbers}</p>
                </div>}
            </Paper>;
        }
        return null;
    }
}

export default withStyles(styles, { withTheme: true })(StartupView);

export const startupPage = (): IReactPage => ({
    menuTitle: '--',
    route: 'startups/:name',
    component: StartupView,
    headers: (store: IHappyTechStore, params?: { name: string }) => {
        let error = '<no-startup-name>';
        if (params) {
            const { name } = params;
            const startup = store.startups.find(s => startupLinkName(s) === name.toLocaleLowerCase())
            if (startup) {
                const title = `${startup.name} x HappyTech`;
                const description = startup.tagline;
                // const sn = startup.socialNetwork;
                const startupsRoute = `https://www.happytech.life/${startupsPage().route}`;
                return {
                    title, description,
                    linkedData: [
                        {
                            '@context': "http://schema.org",
                            "@type": "BreadcrumbList",
                            itemListElement: [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Startups",
                                    "item": startupsRoute
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": startup.name,
                                    "item": `${startupsRoute}/${startupLinkName(startup)}`
                                }
                            ]
                        }
                    ],
                    share: {
                        twitter: {
                            title,
                            description,
                            card: 'summary_large_image',
                            image: cloudinaryTransform(startup.iconUrl, 'w_600,h_314,c_pad,f_png,b_white')
                        },
                        og: {
                            title, description,
                            image: cloudinaryTransform(startup.iconUrl, 'w_1200,h_630,c_pad,f_png,b_white')
                        }
                    }
                }
            }
            error = `<no-startup:${name}>`;
        }
        return {
            title: error,
            description: error,
        }
    }
})
