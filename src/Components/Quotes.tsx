import * as React from 'react';
import { IQuote } from '../models';
import './Startups.css';
import { cloudinaryTransform } from '../Utils/Cloudinary';
import { IReactPageProps, IReactPage } from '../Utils/Pages/models';
import { getHeaders } from '../Utils/Pages/pages';

export class QuotesGrid extends React.Component<IReactPageProps, {}> {
    public render() {
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { citations } = store;
        return citations.map(QuoteCard);
    }
}

function QuoteCard(quote: IQuote) {
    if (quote.startup === undefined) {
        console.log(quote.startupName);
    }
    if (quote.startupName === 'Surfy') {
        quote.startup = {
            iconUrl: 'https://res.cloudinary.com/happytech/image/upload/v1543967003/Summit/partners/logo-surfy.png'
        } as any;
    }
    const width = 1140;
    const height = 790;
    const left = 175;
    const right = 275;
    const top = 140;
    const bg = cloudinaryTransform('https://res.cloudinary.com/happytech/image/upload/v1543962373/templates/citations.png', '');
    return <div key={quote.rowId} >
        <div style={{
            display: 'block', pageBreakBefore: 'always',
            position: 'relative',
            width: 1140, height: 790, border: '0px solid black'
        }}  >
            <img src={bg} style={{ width, height }} />
            <div style={{
                position: 'absolute',
                top, left, width: width - left - right, height: 400,
                fontSize: '2.8em',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'volte-medium'
            }}>{quote.quote}</div>
            <div style={{ position: 'absolute', bottom: 10, right: 75 }} >
                {quote.startup ?
                    <img src={cloudinaryTransform(quote.startup.iconUrl, 'w_300,h_150,f_png,c_pad')} />
                    : <span style={{ width: 300, fontSize: '3em', fontFamily: 'volte-medium' }}>{quote.startupName}</span>}
            </div>
            <div style={{ fontSize: '3em', fontFamily: 'volte-medium', position: 'absolute', bottom: 75, left: 325 }} >
                {quote.level}
            </div>
            <div style={{ position: 'absolute', bottom: 50, left: 25 }} >
                <img src={cloudinaryTransform('https://res.cloudinary.com/happytech/image/upload/v1538052261/logos/HappyTechSummit.jpg', 'w_240,h_100,c_pad')} />
            </div>
        </div>
    </div >

    // return <ListItem style={{ width: 260, margin: 8 }} key={presse.rowId}>
    //     <Tooltip title={presse.title} placement="top">
    //         <ExternalLink link={presse.link}>{logo && <img src={logo} />}</ExternalLink>
    //     </Tooltip>
    // </ListItem>;
}
export const quotePage = (): IReactPage => ({
    menuTitle: 'Quote',
    route: 'quotes',
    component: QuotesGrid,
    headers: () => getHeaders('La HappyTech dans la presse')
});