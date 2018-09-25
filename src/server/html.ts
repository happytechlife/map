import { IHappyTechStore } from "../models";
import * as cj from 'circular-json';
interface IHtml {
  title: string;
  store: IHappyTechStore,
  body: string,
  css: string
}
const html = ({ title, store, body, css }: IHtml) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
      <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
      
      <link rel="shortcut icon" href="https://res.cloudinary.com/happytech/image/upload/c_scale,w_128/v1534592246/logos/happytech_zoom.ico">
      <script src="https://apis.google.com/js/api.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?use_slippy=true&key=AIzaSyCYe_0CiU5xTIZ9f3svSZEaaPUjBb0CHpw&libraries=geometry,places"></script>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
      <link href="/main.css" rel="stylesheet" >
      <style id="jss-server-side">${css}</style>
      <script type="text/javascript" >
        window.GlobalStore = ${ JSON.stringify(cj.stringify(store))}
      </script>
    </head>
    <body style="margin:0">
      <div id="root">${body}</div>
      <script src="/main.js" defer></script>
      <script type="text/javascript">
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for(let registration of registrations) {
            registration.unregister()
          } })
      </script>
    </body>
  </html>
`;

export default html;




