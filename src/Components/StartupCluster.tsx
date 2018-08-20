import * as React from 'react';
import { cloudinaryTransform } from './../Utils/Cloudinary';
// import { Tooltip } from '@material-ui/core'
import { IStartup } from '../models';
import { MapCluster } from '../MapClusters/MapCluster';
import { Pin, StartupTooltipText } from './Pin';
import { buildMultiAvatar } from '../Utils/Avatars';
import './StartupCluster.css';
import { Badge, Tooltip } from '@material-ui/core';

interface IProps {
    lat: number;
    lng: number;
    cluster: MapCluster<IStartup>;
}

function getStartupDisplayElement(startup: IStartup) {
    return startup.iconUrl ?
        <img src={cloudinaryTransform(startup.iconUrl, 'w_32,h_32,c_thumb,g_west')} />
        : <div className="NoIcon">{startup.name.substring(0, 2)}</div>
}

export class StartupCluster extends React.Component<IProps, {}> {
    public render() {
        const { cluster } = this.props;
        // const size = 32;
        // const style = {
        //     marginLeft: -size / 2,
        //     marginTop: -size / 2,
        //     backgroundColor: 'white',
        //     borderRadius: (size / 2), padding: 0, minWidth: size, minHeight: size
        // }
        if (cluster.markers.length === 1) {
            const marker = cluster.markers[0];
            return <Pin {...marker.position} startup={marker.content} />;
        }
        return <div className="StartupCluster">
            <Tooltip placement="right" title={this.tooltip(cluster.markers.map(m => m.content))}>
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
        return startups.map((startup, i) => <StartupTooltipText startup={startup} key={i} />)
    }
}