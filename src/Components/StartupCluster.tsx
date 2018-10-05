import * as React from 'react';
import { cloudinaryTransform } from './../Utils/Cloudinary';
// import { Tooltip } from '@material-ui/core'
import { IStartup } from '../models';
import { MapCluster } from '../MapClusters/MapCluster';
import Pin, { StartupTooltipText } from './Pin';
import { buildMultiAvatar } from '../Utils/Avatars';
import './StartupCluster.css';
import { Badge, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import StartupTooltipCard from './StartupTooltipCard';


const styles: any = (theme: any) => ({
    less: {
        background: 'none',
        boxShadow: 'none',
        margin: 0,
        padding: 4,
        border: 'none',
    },
    more: {
        background: 'white',
        minWidth: 500
    }
});


interface IProps {
    lat: number;
    lng: number;
    cluster: MapCluster<IStartup>;
    onClick: (c: MapCluster<IStartup>) => void;
    classes: any;
}

function getStartupDisplayElement(startup: IStartup) {
    return startup.iconUrl ?
        <img src={cloudinaryTransform(startup.iconUrl, 'w_32,h_32,c_thumb,g_west,f_png')} />
        : <div className="NoIcon">{startup.name.substring(0, 2)}</div>
}

const startupLessLimit = 5;
class StartupCluster extends React.Component<IProps, {}> {
    public render() {
        const { cluster, onClick, classes } = this.props;
        if (cluster.markers.length === 1) {
            const marker = cluster.markers[0];
            return <Pin {...marker.position} startup={marker.content} />;
        }
        return <div className="StartupCluster" onClick={() => { onClick(cluster) }}>
            <Tooltip
                // open={true}
                classes={{
                    tooltip: cluster.markers.length < startupLessLimit ? classes.less : classes.more
                }}
                placement="right" title={this.tooltip(cluster.markers.map(m => m.content))}>
                <Badge badgeContent={cluster.markers.length} color="primary">
                    {this.avatar()}
                </Badge>
            </Tooltip>
        </div>;
    }

    private avatar() {
        const { cluster } = this.props;
        const elements = cluster.markers.map(m => m.content).map(getStartupDisplayElement);
        return buildMultiAvatar(elements);
    }



    private tooltip(startups: IStartup[]) {
        return startups.length < startupLessLimit
            ? <div className="Clusters" style={{ width: 700 }}>{startups.map((startup, i) => <StartupTooltipCard startup={startup} key={i} />)}</div>
            : <div className="Clusters" style={{ width: 500 }}>{startups.map((startup, i) => <StartupTooltipText startup={startup} key={i} />)}</div>

    }

}

export default withStyles(styles)(StartupCluster);