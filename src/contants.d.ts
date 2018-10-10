declare module 'react-chord-diagram';

declare module "*.md" {
    const content: string;
    export = content;
}

declare module 'jimp' {
    namespace Jimp {
        type BlendMode = {
            mode: string;
            opacitySource: number;
            opacityDest: number;
        };

        type ImageCallback<U = any> = (
            this: Jimp,
            err: Error | null,
            value: Jimp,
            coords: {
                x: number;
                y: number;
            }
        ) => U;

        export class Jimp {

            static read(image: Jimp): Promise<Jimp>;
            static read(path: string): Promise<Jimp>;
            scaleToFit(w: number, h: number, cb?: ImageCallback): this;
            composite(
                src: Jimp,
                x: number,
                y: number,
                options?: BlendMode,
                cb?: ImageCallback
            ): this;
        }

    }

    export default Jimp.Jimp;

}
