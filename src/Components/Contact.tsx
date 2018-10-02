import * as React from 'react';
import './Startups.css';
import * as md from './../Markdowns/contact.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { getHeaders } from '../Utils/Pages/pages';
import ContactIcon from '@material-ui/icons/ContactSupport';
// tslint:disable-next-line:no-var-requires
const HubspotForm = require('react-hubspot-form')

export class Contact extends React.Component<IReactPageProps, {}> {
    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        return <React.Fragment>
            {page && helmet(page, store)}
            <Markdown md={md}>
                <div style={{ margin: 'auto', maxWidth: 400 }}>
                    <HubspotForm
                        portalId='3943429'
                        formId='dc25e094-a926-4d94-b4d8-94ec57175bc8'
                        loading={<div>Chargement...</div>}
                    />
                </div>
            </Markdown>
        </React.Fragment>
    }
}

export const contactPage = (): IReactPage => ({
    menuTitle: 'Nous contacter',
    icon: ContactIcon,
    route: 'contact',
    component: Contact,
    headers: () => getHeaders('Contactez la HappyTech')
});