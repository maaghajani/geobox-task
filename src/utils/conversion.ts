

export const coord_3857_To_4326 = (coord : {lng: number ,lat: number}): {lat: number , lng: number} =>  {

    const e_value = 2.7182818284;
    const X = 20037508.34;

    const lat3857 = coord.lat
    const long3857 = coord.lng;

    //converting the longitute from epsg 3857 to 4326
    const long4326 = (long3857*180)/X;

    //converting the latitude from epsg 3857 to 4326 split in multiple lines for readability
    let lat4326 = lat3857/(X / 180);
    const exponent = (Math.PI / 180) * lat4326;

    lat4326 = Math.atan(Math.pow(e_value, exponent));
    lat4326 = lat4326 / (Math.PI / 360);
    lat4326 = lat4326 - 90;

    return {lat:lat4326, lng:long4326};

}
