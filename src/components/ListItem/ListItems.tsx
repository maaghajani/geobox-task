// @flow
import * as React from 'react';
import {FC, useEffect, useState} from "react";
import { List, Skeleton} from "antd";
import GeoJson, {Point} from "geojson";
import {Attribute} from "@/components/Maps/Main";
import { SettingOutlined} from "@ant-design/icons";

type Props = {
    searchCity: string
    setMapCities: (data: GeoJson.FeatureCollection<Point, Attribute>) => void
    setCitySelectedId: (fid: number) => void
};

export const ListItems:FC<Props> = ({searchCity,setMapCities, setCitySelectedId}) => {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] =
        useState<GeoJson.FeatureCollection<Point, Attribute> | undefined>(undefined);


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch(process.env.REACT_APP_API_URL! + "&search=" + searchCity);
                const data = await response.json();
                setCities(data);
                setMapCities(data)
            } catch (error) {
                console.error(error);
            }finally {
                setLoading(false)
            }
        }
         fetchData();
    }, [searchCity]);

    return (
        loading ? <Skeleton avatar title={false} loading={loading} active/>
        :
            <List header={<div style={{fontSize: '1.2rem',marginRight: 10}}>نام شهر </div>}
            loading={loading}
            style={{fontFamily: 'Vazir' , maxHeight: '90vh' , overflow: 'auto'}}
            itemLayout="horizontal"
            split
            dataSource={cities?.features}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <SettingOutlined onClick={() => setCitySelectedId(item.properties.fid)} key="setting" />,

                    ]}
                    key={item.properties.fid}
                    onClick={() => setCitySelectedId(item.properties.fid)}
                >
                        <List.Item.Meta
                            style={{fontFamily: 'vazir' , margin: 10}}
                            title={item.properties?.Name}
                            description={` جمعیت کل: ${item.properties.Population}`}
                        />

                </List.Item>
            )}
        />)

};
