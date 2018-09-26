import * as React from 'react';
import { Divider, Card, CardMedia, CardContent, Typography, List, CardActions } from '@material-ui/core'
import { IHappyTechStore, ICompany } from '../models';
import * as md from './../Markdowns/entreprises.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { HappyTechTypeForm } from '../Utils/typeform';
import { cloudinaryTransform } from '../Utils/Cloudinary';

interface IProps {
    store: IHappyTechStore
}

export class Entreprises extends React.Component<IProps, {}> {
    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { entreprises } = store;
        return <React.Fragment>
            <Markdown md={md}>
                {HappyTechTypeForm('QFxtC9', "Remplir le formulaire d'adhésion entreprise")}
                <Divider style={{ margin: 24 }} />
                <List style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{entreprises.map(CompanyCard)}</List >
            </Markdown>
        </React.Fragment>
    }
}

function CompanyCard(company: ICompany) {
    const logo = cloudinaryTransform(company.logo, 'w_300,h_168,c_pad,f_png');
    return <Card key={company.rowId} style={{ width: 320, margin: 8 }}>
        <div >
            {logo && <CardMedia style={{ paddingTop: '56.25%', marginTop: 8 }}
                image={logo}
                title={company.name}
            />}
            <CardContent >
                <Typography gutterBottom={true} variant="headline" component="h2">
                    {company.name}
                </Typography>
                <Typography variant="caption" align="center" >{company.description}</Typography>
            </CardContent>
            <CardActions>
                {company.link && company.link && <a href={company.link}>Voir le site</a>}
            </CardActions>
        </div>
    </Card>;
}