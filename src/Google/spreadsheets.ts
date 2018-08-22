// tslint:disable-next-line:no-var-requires
require('dotenv').config();

export const googleConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
    discoveryDocs:
        ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    spreadsheetId: "1lIQ3w3lFf_w-dKuqCgMqqLNrS9Kj37BnRaKAGbGJ0Us"
};



export async function getRows(spreadsheetId: string, range: string) {
    return new Promise<string[]>(r => {
        gapi.client.load("sheets", "v4", () => {
            const sheetsClient: any = gapi.client; // typescript build
            sheetsClient.sheets.spreadsheets.values
                .get({
                    range,
                    spreadsheetId
                })
                .then((response: any) => {
                    const data: string[] = Array.from(response.result.values);
                    r(data);
                });
        });
    })
}
export async function getValues<T>(spreadsheetId: string, range: string, parse: (d: string) => T): Promise<T[]> {
    const data = await getRows(spreadsheetId, range);
    // const data: string[] = Array.from(await );
    const res: T[] = await Promise.all(data.map(parse));
    return res;
}
