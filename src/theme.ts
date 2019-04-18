import { createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        common: {
          black: "#000000",
          white: "#FFFFFF",
        },
        primary: {
            main: '#FFE666'
        },
        secondary: {
            main: '#0059B3'
        },
        background: {
            default: "#F5F6F7",
        },
        text: {
          primary: '#001A33',
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Quicksand',
            'arial'
        ].join(',')
    },
    spacing: {
      unit: 8,
    },
});

export default theme;
