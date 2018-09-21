import * as React from 'react';
import { IHappyTechStore } from '../models';
import './StartupCard';
interface IProps {
    store: IHappyTechStore
}
// tslint:disable-next-line:no-var-requires
// const ChordDiagram = require('react-chord-diagram');
import ChordDiagram from 'react-chord-diagram'
import { Paper } from '@material-ui/core';
import { IStartup, ITag } from '../models';


// declare module 'react-chord-diagram';

// const m2 = [
//     [11975, 5871, 8916, 2868],
//     [1951, 10048, 2060, 6171],
//     [8010, 16145, 8090, 8045],
//     [1013, 990, 940, 6907]
// ];

interface IMatch {
    startup: IStartup;
    tagStartup: IStartup;
    tag: ITag;
}


// override the hover action
function getCD(matrix: IMatrix, startups: IStartup[]) {
    return class CD extends ChordDiagram {
        public text: any;
        public setMouseOverGroup(mouseOverGroup: any) {
            if (mouseOverGroup !== null) {
                const startup = startups[mouseOverGroup];
                const matchsKeys = matrix[startup.name].matchs;
                if (matchsKeys) {
                    const matchs = Object.keys(matchsKeys).map(s2Name => matchsKeys[s2Name])
                    // matchs.map()
                    const merged: IMatch[] = [].concat.apply([], matchs);
                    this.text = merged.map((m, i) => <div key={i}>{`${m.tagStartup.name} : ${m.tag.name}`}</div>);
                }
            } else {
                this.text = null;
            }
            // console.log(mouseOverGroup);
            super.setMouseOverGroup(mouseOverGroup);
        }

        public render() {
            return <div>
                <div style={{ position: 'absolute' }}>{this.text}</div>
                <div>{super.render()}</div>
            </div>
        }
    }
}

interface IMatrix { [name: string]: { matchs: { [name: string]: IMatch[] } } }
export class StartupsChordDiagramWithTags extends React.Component<IProps, {}> {
    public render() {
        // console.log(this.props);
        const { store } = this.props;
        if (!store) {
            return null;
        }
        const { startups } = store;


        // const matchs: Intersection = [];
        const matrix: IMatrix = {};
        startups.forEach(startup => {
            matrix[startup.name] = { matchs: {} };
            startup.tags.forEach(tag => {
                tag.startups.forEach(tagStartup => {
                    if (startup !== tagStartup) {
                        matrix[startup.name].matchs[tagStartup.name]
                            = (matrix[startup.name].matchs[tagStartup.name] || [])
                                .concat([{ startup, tagStartup, tag }])
                    }
                })
            })
        });


        const withTags = startups.filter(s => s.tags.length > 0);
        const chordMatrix = withTags.map(s1 => {
            return startups.map(s2 => {
                const row = matrix[s1.name];
                if (row.matchs[s2.name]) {
                    return row.matchs[s2.name].length;
                }
                return 0;
            })
        })


        // console.log(matrix, chordMatrix);
        const A: any = getCD(matrix, withTags);
        return <Paper style={{ margin: 8, padding: 64 }}><A
            width={900} height={600}
            matrix={chordMatrix}
            componentId={1}
            groupLabels={withTags.map(s => s.name)}
            groupColors={["#752BB2", "#FFDD89", "#957244", "#F26223",
                "#B21212", "#FFFC19", "#FF0000", "#1485CC", "#0971B2",
                "#FFC971", "#B357FF", "#31CC6C", "#01B22B"]}
        /></Paper>;

    }
}
