import { IStartup, ILatLng } from "./models";

export const geocode = async (startup: IStartup) => {
    return new Promise<ILatLng | null>(resolve => {
        if (startup.latLng) {
            return resolve(startup.latLng);
        }
        const address = startup.address;
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

export const parseStartupSheet = (d: any) => {
    let latLng;
    if (d[3]) {
        const [lat, lng] = d[3].split(',');
        latLng = { lat, lng }
    }
    const startup = { name: d[0], address: d[1], iconUrl: d[2], latLng };
    return startup;
};
