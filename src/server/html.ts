import { IHappyTechStore } from "../models";
import * as cj from 'circular-json';
import { HelmetData } from "react-helmet";
interface IHtml {
  store: IHappyTechStore,
  body: string,
  css: string
  helmet: HelmetData;
}

const googleMapsApi = 'AIzaSyCedkLl7E-PLQBOQOQP8hJXJUzjHmIeZTs';

const html = ({ helmet, store, body, css }: IHtml) => `
  <!DOCTYPE html>
  <html prefix="og: http://ogp.me/ns#">
    <head>
      <meta charset="utf-8" />
      
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
      <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
      <meta name="google-site-verification" content="27ecIdQDv1hp9H3lsJwap52eAcEcoV3o-Mok0TO7t_c" />
      <link rel="shortcut icon" href="https://res.cloudinary.com/happytech/image/upload/c_scale,w_128/v1534592246/logos/happytech_zoom.ico">
      <script src="https://apis.google.com/js/api.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?use_slippy=true&key=${googleMapsApi}&libraries=geometry,places"></script>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
      <link href="/main.css" rel="stylesheet" >
      <style id="jss-server-side">${css}</style>
      <script type="text/javascript" >
        window.GlobalStore = ${ JSON.stringify(cj.stringify(store))}
      </script>
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-99292406-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-99292406-1');
      </script>

    </head>
    <body style="margin:0">
      <div id="root">${body}</div>
      <script src="/main.js" defer></script>
      <!-- Start of HubSpot Embed Code -->
      <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/3943429.js"></script>
      <!-- End of HubSpot Embed Code -->      
    </body>
  </html>
`;

export default html;




