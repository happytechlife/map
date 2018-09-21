import * as React from 'react';
import { List, Divider } from '@material-ui/core'
import { IHappyTechStore } from '../models';
import StartupCard from './StartupCard';
import './Startups.css';
import md from './../Markdowns/startups.md';
import { Markdown } from '../Utils/Pages/Markdown';
// // tslint:disable-next-line:no-var-requires
// const typeform = require('react-typeform-embed');
// const ReactTypeformEmbed = typeform.ReactTypeformEmbed;

interface IProps {
    store: IHappyTechStore
}

const typeformButton = `<a class="typeform-share button" href="https://happytech.typeform.com/to/NCIVkm" data-mode="popup" target="_blank">Remplir le formulaire d'adhésion</a> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>`;


export class Startups extends React.Component<IProps, {}> {
    public render() {
        // console.log(this.props);
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;
        return <React.Fragment>
            <Markdown md={md}>
                <div className="flexCenter" dangerouslySetInnerHTML={{ __html: typeformButton }} />
                <Divider style={{ margin: 24 }} />
                <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{startups.map(s => <StartupCard classNames="StartupCard" key={s.rowId} startup={s} />)}</List >
            </Markdown>
        </React.Fragment>
    }
}
