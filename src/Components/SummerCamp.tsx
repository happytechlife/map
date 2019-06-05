import * as React from 'react';
import { IHappyTechStore } from '../models';
import './Startups.css';
import { Markdown } from '../Utils/Pages/Markdown';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { getHeaders } from '../Utils/Pages/pages';
import * as md from './../Markdowns/happytechsummercamp.md';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

interface IProps extends IReactPageProps {
    store: IHappyTechStore
}

export class SummerCamp extends React.Component<IProps, {}> {
    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        return <React.Fragment>
            {page && helmet(page, store)}
            <div className="flexCenter">
                {/* <img style={{ width: '100%' }} src={'https://res.cloudinary.com/happytech/image/upload/v1542451457/Summit/Visuel-HappyTech-Summit.png'} /> */}
            </div>
            <Markdown md={md} />
        </React.Fragment>
    }
}

export const summerCampPage = (): IReactPage => ({
    menuTitle: 'HappyTech Summer Camp',
    icon: InsertEmoticon,
    route: 'summer_camp',
    component: SummerCamp,
    // html: getHtml(happytechsummitMarkdown),
    headers: () => {
        const h = getHeaders("HappyTech Summer Camp 2019, Inscrivez-vous vite à la plus grande concentration d'innovations technologiques au service du bien-être en entreprise");
        h.description = "Le HappyTech Summit est le 1er événement en France qui réunit l’ensemble des innovations technologiques dédiées au bien-être en entreprise. Ce rendez-vous est réservé aux professionnels cherchant à trouver des solutions clés en main pour leurs initiatives de bien-être en entreprise. Plus de 40 startups seront réunies pour présenter toutes les dernières innovations et solutions en 6 villages thématiques"
        if (h.share) {
            h.share.og.image = 'https://res.cloudinary.com/happytech/image/upload/v1539944008/Summit/social-network.png'
            h.share.og.description = h.description;
            h.share.twitter.image = 'https://res.cloudinary.com/happytech/image/upload/v1539944009/Summit/twitter.png';
            h.share.twitter.description = h.description;
            h.share.twitter.card = 'summary_large_image';
        }
        return h;
    }
});

