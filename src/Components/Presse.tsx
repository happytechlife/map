import * as React from 'react';
import { List, ListItem, Tooltip } from '@material-ui/core'
import { IPresse } from '../models';
import './Startups.css';
import * as md from './../Markdowns/presse.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { getHeaders } from '../Utils/Pages/pages';
import BookIcon from '@material-ui/icons/Book';
import { ExternalLink } from '../Utils/ExternalLink';

export class PresseGrid extends React.Component<IReactPageProps, {}> {
    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        const { presse } = store;
        return <React.Fragment>
            {page && helmet(page, store)}
            <Markdown md={md}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 828 }}>{presse.map(PresseCard)}</List >
                </div>
            </Markdown>
        </React.Fragment>
    }
}

function PresseCard(presse: IPresse) {
    const logo = cloudinaryTransform(presse.logo, 'w_240,h_168,c_pad,f_png');
    return <ListItem style={{ width: 260, margin: 8 }} key={presse.rowId}>
        <Tooltip title={presse.title} placement="top">
            <ExternalLink link={presse.link}>{logo && <img src={logo} />}</ExternalLink>
        </Tooltip>
    </ListItem>;
}
export const pressePage = (): IReactPage => ({
    menuTitle: 'Presse',
    icon: BookIcon,
    route: 'presse',
    component: PresseGrid,
    headers: () => getHeaders('La HappyTech dans la presse')
});