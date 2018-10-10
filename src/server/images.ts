import * as express from 'express';
export function toImageMime(res: express.Response, img: Jimp.Jimp) {
    const mime = img.getMIME();
    // const b = await icon.getBuffer(mime, () => false);
    img.getBuffer(mime, (err, buffer) => {
        res.writeHead(200, {
            'Content-Type': mime,
            'Content-Length': buffer.length
        });
        res.end(buffer);
    })
}