import { createMuiTheme } from '@material-ui/core';
import { colors } from '@material-ui/core';

export default createMuiTheme({
    palette: {
        primary: colors.orange
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'arial'
        ].join(',')
    }
});