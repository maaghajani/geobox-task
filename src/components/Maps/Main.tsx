// @flow
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
    FullscreenControl,
    GeolocateControl,
    MapRef,
    NavigationControl,
    ScaleControl,
    Popup, Marker
} from "react-map-gl"
import GeoJson, {Point} from "geojson";
import * as React from 'react';
import {FC, MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import {coord_3857_To_4326} from "../../utils/conversion";
import Pin from "./pin";
type Props = {
    cities: GeoJson.FeatureCollection<Point, Attribute>
    selectCityId: number
};

export type Attribute ={
    fid:number,
    __min_zoom:number,
    Name:string,
    Population:number,
    MenPopulation:number,
    WomenPopulation:number,
    Family:number
}
export const Main:FC<Props> = props => {

    const mapRef = useRef<MapRef>();
    const [popupInfo, setPopupInfo] = useState<GeoJson.Feature<Point, Attribute> | null>(null);

    const cityMarkers = useMemo(
        () =>
            props?.cities?.features?.map((city, index) => (
                <Marker
                    key={city.id}
                    longitude={coord_3857_To_4326({lng: city.geometry.coordinates[0], lat: city.geometry.coordinates[1]}).lng}
                    latitude={coord_3857_To_4326({lng: city.geometry.coordinates[0], lat: city.geometry.coordinates[1]}).lat}
                    anchor="bottom"
                    onClick={e => {

                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}
                >
                    <Pin />
                </Marker>
            )),
        [props.cities]
    );


    useEffect(() => {
        if(props.selectCityId){
            const _featSel = props?.cities?.features?.find(x => x.properties.fid ===props.selectCityId)
            setPopupInfo(_featSel!)
            _featSel && mapRef.current?.flyTo({center:
                    {
                        lng: coord_3857_To_4326({
                            lng: _featSel.geometry.coordinates[0],
                            lat: _featSel.geometry.coordinates[1]
                        }).lng,
                        lat: coord_3857_To_4326({
                            lng: _featSel.geometry.coordinates[0],
                            lat: _featSel.geometry.coordinates[1]
                        }).lat
                    } , zoom: 14,animate: true})
        }

    } , [props.selectCityId])

        return (
               <Map
                    ref={mapRef as MutableRefObject<MapRef>}
                    attributionControl={false}
                    mapboxAccessToken={process.env.REACT_APP_TOKEN}
                    initialViewState={{
                        longitude: 51,
                        latitude: 35,
                        zoom: 5,
                    }}
                    style={{ height: "100vh" }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"

                >
                            {cityMarkers}
                    <GeolocateControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl position="bottom-right" />

                            {popupInfo && (
                                <Popup

                                    onOpen={(e)=> mapRef?.current?.flyTo({
                                        duration:3000,

                                        animate: true,
                                        zoom:12,
                                        center: {
                                        lng: coord_3857_To_4326({lng: popupInfo?.geometry.coordinates[0], lat: popupInfo.geometry.coordinates[1]}).lng,
                                        lat:coord_3857_To_4326({lng: popupInfo?.geometry.coordinates[0], lat: popupInfo.geometry.coordinates[1]}).lat}})
                                }
                                    anchor="top"
                                    longitude={coord_3857_To_4326({lng: popupInfo?.geometry.coordinates[0], lat: popupInfo.geometry.coordinates[1]}).lng}
                                    latitude={coord_3857_To_4326({lng: popupInfo?.geometry.coordinates[0], lat: popupInfo.geometry.coordinates[1]}).lat}
                                    onClose={() => setPopupInfo(null)}
                                >
                                    <div style={{fontFamily: 'vazir'}}>
                                        {'نام شهر: '}
                                        {popupInfo.properties.Name}

                                    </div>

                                    <div  style={{fontFamily: 'vazir'}}>
                                        {'جمعیت کل: '}
                                        {popupInfo.properties.Population}

                                    </div>

                                </Popup>
                            )}

                </Map>

);
};
