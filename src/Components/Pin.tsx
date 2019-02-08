import * as React from 'react';
import { cloudinaryTransform } from './../Utils/Cloudinary';
import { Tooltip } from '@material-ui/core'
import { IStartup } from '../models';
import './Pin.css';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core';
import StartupTooltipCard from './StartupTooltipCard';

interface IPinProps {
    lat: number;
    lng: number;
    startup: IStartup;
    classes: any;
}

const styles: any = (theme: any) => ({
    tooltip: {
        background: 'none',
        color: theme.palette.text.primary,
        boxShadow: 'none',
        fontSize: 11,
        margin: 0,
        padding: 0,
        border: 'none'
    }
});

class Pin extends React.Component<IPinProps, {}> {
    public render() {
        const { startup, classes } = this.props;
        const size = 32;
        const style = {
            marginLeft: -size / 2,
            marginTop: -size / 2,
            backgroundColor: 'white',
            borderRadius: (size / 2), padding: 0, minWidth: size, minHeight: size
        }
        return <Tooltip
            placement="right"
            classes={{ tooltip: classes.tooltip }}
            title={this.tooltip(startup)}><div className="Pin" style={style}>
                {
                    startup.iconUrl ?
                        <img src={cloudinaryTransform(startup.iconUrl, 'w_32,h_32,c_thumb,g_west,f_png')} />
                        : startup.name
                }
            </div></Tooltip>;
    }

    private tooltip(startup: IStartup) {
        return <StartupTooltipCard classes={{}} startup={startup} />;
        // return StartupTooltipText({ startup });
    }
}

export default withStyles(styles)(Pin);


export const StartupChip = (startup: IStartup) => {
    const style = { margin: 4 };
    const logo = startup.iconUrl;
    if (logo) {
        return <Chip
            key={startup.rowId}
            style={style}
            avatar={<Avatar style={{ border: '1px solid #ccc', backgroundColor: 'white' }} src={cloudinaryTransform(logo, 'w_32,h_32,c_thumb,g_west,f_png')} />}
            label={startup.name} />
    }
    return <Chip style={style} label={startup.name} key={startup.rowId} />
}

export const StartupTooltipText = (props: { startup: IStartup }) => {
    const { startup } = props;
    return StartupChip(startup);
}