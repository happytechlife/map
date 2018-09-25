import * as React from 'react';
import { IHappyTechStore, IPartner } from '../models';
// import StartupCard from './StartupCard';
// import './Startups.css';
import * as md from './../Markdowns/partenaires.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { Card, CardMedia, CardContent, Typography, CardActions, List, Divider } from '@material-ui/core';
import { groupListByProperty } from '../Utils/misc';

interface IProps {
    store: IHappyTechStore
}

export class Partners extends React.Component<IProps, {}> {
    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { partners } = store;
        const partnersByType = groupListByProperty<IPartner>(partners, 'type');
        return <React.Fragment>
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
            </Markdown>
        </React.Fragment>
    }
}

function PartnerCard(partner: IPartner) {
    const logo = cloudinaryTransform(partner.logo, 'w_300,h_168,c_pad,f_png');
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
                {partner.website && <a href={partner.website}>Voir le site</a>}
            </CardActions>
        </div>
    </Card>;
}