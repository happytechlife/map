import * as React from 'react';
import { List, Divider, Hidden } from '@material-ui/core'
import { IHappyTechStore } from '../models';
import StartupCard from './StartupCard';
import './Startups.css';
import * as md from './../Markdowns/startups.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { HappyTechTypeForm } from '../Utils/typeform';

interface IProps {
    store: IHappyTechStore
}



export class Startups extends React.Component<IProps, {}> {
    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        return <React.Fragment>
            <Markdown md={md}>
                {HappyTechTypeForm('NCIVkm', "Remplir le formulaire d'adhésion startup")}
                <Divider style={{ margin: 24 }} />
                <Hidden smDown={true}>
                    <div className="flexCenter">
                        <img src={`https://res.cloudinary.com/happytech/image/upload/w_720/v1537882261/website/carte_sept.png`} />
                    </div>
                    <Divider style={{ margin: 24 }} />
                </Hidden>
                <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{startups.map(s => <StartupCard classNames="StartupCard" key={s.rowId} startup={s} />)}</List >
            </Markdown>
        </React.Fragment>
    }
}
