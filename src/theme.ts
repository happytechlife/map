import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#EDA056'
        }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Quicksand',
            'arial'
        ].join(',')
    }
});