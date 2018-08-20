import * as React from 'react';
import { cloudinaryTransform } from './../Utils/Cloudinary';
import { Tooltip } from '@material-ui/core'
import { IStartup } from '../models';
import './Pin.css';

interface IPinProps {
    lat: number;
    lng: number;
    startup: IStartup;
}

export class Pin extends React.Component<IPinProps, {}> {
    public render() {
        const { startup } = this.props;
        const size = 32;
        const style = {
            marginLeft: -size / 2,
            marginTop: -size / 2,
            backgroundColor: 'white',
            borderRadius: (size / 2), padding: 0, minWidth: size, minHeight: size
        }
        return < Tooltip title={this.tooltip(startup)}><div className="Pin" style={style}>
            {
                startup.iconUrl ?
                    <img src={cloudinaryTransform(startup.iconUrl, 'w_32,h_32,c_thumb,g_west')} />
                    : startup.name
            }
        </div></Tooltip>;
    }

    private tooltip(startup: IStartup) {
        return StartupTooltipText({ startup });
    }
}


export const StartupTooltipText = (props: { startup: IStartup }) => {
    const { startup } = props;
    return <div ><b>{startup.name}</b><br />{startup.address}</div>
}