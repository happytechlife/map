export const CloudinaryServer = 'https://res.cloudinary.com/happytech/';
export const CloudinaryFetchPath = `${CloudinaryServer}image/fetch/`;
const cloudinaryFetchRegexp = new RegExp(/\/fetch\/[^/]+\/http/i);
const cloudinaryFacebookRegexp = new RegExp(/\/image\/facebook/i);

export const cloudinaryTransform = (imageUrl: string, transformation: string) => {
    if (!imageUrl || !transformation) {
        return imageUrl;
    }
    // is already cloudinary image
    if (imageUrl.indexOf(CloudinaryServer) === 0) {
        if (cloudinaryFetchRegexp.test(imageUrl)) {
            return imageUrl.replace(/\/fetch\/[^/]+\/http/i, `/fetch/${transformation}/http`);
        } else if (cloudinaryFacebookRegexp.test(imageUrl)) {
            return imageUrl.replace('/facebook/', `/facebook/${transformation}/`);
        } else {
            return imageUrl.replace('/upload/', `/upload/${transformation}/`);
        }
    } else {
        return `${CloudinaryFetchPath}${transformation}/${imageUrl}`;
    }
};

export const cloudinaryTransformWithLocalPath = (img: string, transformation: string) => {
    return cloudinaryTransform(`${cloudinaryUrl(img)}`, transformation);
};

export const cloudinaryUrl = (img: string) => {
    return `${CloudinaryServer}/image/upload/v0/${img}`;
};
