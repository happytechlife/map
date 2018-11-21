import * as React from 'react';
import { List, Divider, Hidden } from '@material-ui/core'
import { IHappyTechStore } from '../models';
import StartupCard from './StartupCard';
import './Startups.css';
import * as md from './../Markdowns/startups.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { HappyTechTypeForm } from '../Utils/typeform';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { getHeaders } from '../Utils/Pages/pages';
import ViewModule from '@material-ui/icons/ViewModule';
import { cloudinaryTransform } from '../Utils/Cloudinary';

interface IProps extends IReactPageProps {
    store: IHappyTechStore
}

export class Startups extends React.Component<IProps, {}> {
    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        return <React.Fragment>
            {page && helmet(page, store)}
            <Markdown md={md}>
                {HappyTechTypeForm('NCIVkm', "Remplir le formulaire d'adhésion startup")}
                <Divider style={{ margin: 24 }} />
                {/* <Hidden smDown={true}> */}
                <div className="flexCenter">
                    <img style={{ width: '100%' }} src={cloudinaryTransform('https://res.cloudinary.com/happytech/image/upload/v1542729540/website/carte/carte_nov.png', '')} />
                </div>
                <Divider style={{ margin: 24 }} />
                {/* </Hidden> */}
                <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{startups.map(s => <StartupCard classNames="StartupCard" key={s.rowId} startup={s} />)}</List >
            </Markdown>
        </React.Fragment>
    }
}

export const startupsPage = (): IReactPage => ({
    menuTitle: 'Les startups',
    icon: ViewModule,
    route: 'startups',
    component: Startups,
    headers: () => getHeaders('Les startups de la HappyTech')
});
