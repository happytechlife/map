interface IHtml { body: string, css: string }
const html = ({ body, css }: IHtml) => `
  <!DOCTYPE html>
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
      <link rel="shortcut icon" href="https://res.cloudinary.com/happytech/image/upload/c_scale,w_128/v1534592246/logos/happytech_zoom.ico">
      <script src="https://apis.google.com/js/api.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?use_slippy=true&key=AIzaSyCYe_0CiU5xTIZ9f3svSZEaaPUjBb0CHpw&libraries=geometry,places"></script>
    </head>
    <body style="margin:0">
      <div id="root">${body}</div>
      <style id="jss-server-side">${css}</style>
      
    </body>
  </html>
`;

export default html;