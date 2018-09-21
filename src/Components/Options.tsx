import * as React from 'react';
import { Button, Paper } from '@material-ui/core'
import { IHappyTechStore } from "./../models";

interface IProps {
    store: IHappyTechStore
}

export class Options extends React.Component<IProps, {}> {
    public render() {
        return <Paper style={{ margin: 8 }}>
            <Button style={{ margin: 8 }} variant="raised" color="primary" onClick={() => {
                localStorage.removeItem('model');
                // window.location.reload();
            }}>Happytech cocktail shaker</Button>
        </Paper>;
    }
}
