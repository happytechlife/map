import * as React from 'react';
import { ICompany } from '../models';
import { Divider, Card, CardMedia, CardContent, Typography, List, CardActions, Button } from '@material-ui/core'
import * as md from './../Markdowns/entreprises.md';
import { Markdown } from '../Utils/Pages/Markdown';
import { HappyTechTypeForm } from '../Utils/typeform';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { helmet } from '../Utils/Helmet';
import { getHeaders } from '../Utils/Pages/pages';
import AccountBalance from '@material-ui/icons/AccountBalance';
import { ExternalLink } from '../Utils/ExternalLink';

export class Entreprises extends React.Component<IReactPageProps, {}> {
    public render() {
        const { store, page } = this.props;
        if (!store) {
            return null;
        }
        const { entreprises } = store;
        return <React.Fragment>
            {page && helmet(page, store)}
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
                <Typography gutterBottom={true} variant="subtitle1" >
                    {company.name}
                </Typography>
                <Typography variant="caption" align="center" >{company.description}</Typography>
            </CardContent>
            <CardActions>
                {company.link && <ExternalLink link={company.link}><Button variant="outlined">Voir le site</Button></ExternalLink>}
            </CardActions>
        </div>
    </Card>;
}
export const entreprisesPage = (): IReactPage => ({
    menuTitle: 'Les entreprises',
    icon: AccountBalance,
    route: 'entreprises',
    component: Entreprises,
    headers: () => getHeaders('Les entreprises HappyTech')
});
