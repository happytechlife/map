import * as React from 'react';
import { IPartner } from '../models';
import * as md from './../Markdowns/partenaires.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { Card, CardMedia, CardContent, Typography, CardActions, List, Divider, Button } from '@material-ui/core';
import { groupListByProperty } from '../Utils/misc';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { getHeaders } from '../Utils/Pages/pages';
import SyncIcon from '@material-ui/icons/Sync';
import { ExternalLink } from '../Utils/ExternalLink';


export const hubspotForm = () => <div className="flexCenter" dangerouslySetInnerHTML={{
    __html: `<script charSet="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script><script>hbspt.forms.create({"portalId": "3943429","formId": "be6c09e3-ecd5-4ded-bf38-ec78398459c8"});</script>`
}} />
export class Partners extends React.Component<IReactPageProps, {}> {
    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        const { partners } = store;
        const partnersByType = groupListByProperty<IPartner>(partners, 'type');
        return <React.Fragment>
            {page && helmet(page, store)}
            <Markdown md={md}>
                {/* {HappyTechTypeForm('QFxtC9', "Remplir le formulaire d'adhésion entreprise")} */}
                <Divider style={{ margin: 24 }} />
                {Object.keys(partnersByType).map((key, i) => {
                    const values = partnersByType[key];
                    return <React.Fragment key={i}>
                        <h1 className="title">{key}</h1>
                        <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{values.map(PartnerCard)}</List >
                    </React.Fragment>
                })}
                <Divider style={{ margin: 24 }} />
            </Markdown>
        </React.Fragment>
    }
}

function PartnerCard(partner: IPartner) {
    const logo = cloudinaryTransform(partner.logo, 'w_300,h_168,c_pad,f_png,q_100');
    return <Card key={partner.rowId} style={{ width: 320, margin: 8 }}>
        <div >
            {logo && <CardMedia style={{ paddingTop: '56.25%', marginTop: 8 }}
                image={logo}
                title={partner.name}
            />}
            <CardContent >
                <Typography gutterBottom={true} variant="headline" component="h2">
                    {partner.name}
                </Typography>
                <Typography variant="caption" align="center" >{partner.description}</Typography>
            </CardContent>
            <CardActions>
                {partner.website && <ExternalLink link={partner.website}><Button variant="raised">Voir le site</Button></ExternalLink>}
            </CardActions>
        </div>
    </Card>;
}

export const partnersPage = (): IReactPage => ({
    menuTitle: 'Les partenaires',
    icon: SyncIcon,
    route: 'partenaires',
    component: Partners,
    headers: () => getHeaders('Les partenaires de la HappyTech')
});

