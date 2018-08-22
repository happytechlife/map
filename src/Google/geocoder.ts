import { ILatLng } from '../models';

export const geocode = async (address: string) => {
    return new Promise<ILatLng | null>(resolve => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (results: google.maps.GeocoderResult[], status: any) => {
            if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                const l = results[0].geometry.location;
                const latlng: ILatLng = { lat: l.lat(), lng: l.lng() };
                return resolve(latlng);
            }
            return resolve(null);
        });
    })
}