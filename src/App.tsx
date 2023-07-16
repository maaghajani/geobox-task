import React, {useState} from 'react';

import {Attribute, Main} from './components/Maps/Main'

import { Layout, Menu , Watermark} from 'antd';
import {SearchBox} from "./components/Search/SearchBox";
import {ListItems} from "./components/ListItem/ListItems";
import GeoJson, {Point} from "geojson";

const { Sider, Content } = Layout;



function App() {
const [searchCity , setSearchCity] = useState('')
    const [cities, setCities] =
        useState<GeoJson.FeatureCollection<Point, Attribute> | undefined>(undefined);
        const [selectedId , setSelectedId] = useState<number | undefined>(undefined)
    return (
        <Watermark
            content="GeoBox"
            height={80}
            width={100}
        >
            <Layout dir='rtl' style={{ minHeight: '100vh' }}>
                <Sider    theme='light' dir='rtl' width='300px'

                >

                    <SearchBox setSearchCityName={setSearchCity}/>
                    <ListItems setCitySelectedId={setSelectedId}  setMapCities={setCities} searchCity={searchCity}/>
                    <Menu theme='light' direction='rtl' />
                </Sider>
                <Layout>
                    <Content>
                       <Main selectCityId={selectedId!} cities={cities!} />
                    </Content>
                </Layout>
            </Layout>
        </Watermark>
  );
}

export default App;
