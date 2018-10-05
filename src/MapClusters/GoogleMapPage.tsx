import * as React from 'react';
import { IReactPage, IReactPageProps } from '../Utils/Pages/models';
import MapIcon from '@material-ui/icons/Map';
import { getHeaders } from '../Utils/Pages/pages';

export class GoogleMapPage extends React.Component<IReactPageProps, {}> {

    public render() {
        try {
            const { store } = this.props;
            const GoogleMap = require('./GoogleMap').GoogleMap;
            return <GoogleMap store={store} />
        }
        catch {
            return null;
        }
    }
}

export const googleMapPage = (): IReactPage => ({
    menuTitle: 'Le plan',
    route: 'map',
    icon: MapIcon,
    component: GoogleMapPage,
    headers: () => getHeaders(`Le plan des startups HappyTech`)
})