// @flow
import * as React from 'react';
import {FC} from "react";
import {Input} from "antd";

type Props = {
    setSearchCityName:  (value: string)  => void;
};

const { Search } = Input;
export const SearchBox:FC<Props> = ({setSearchCityName}) => {

        return (

                <Search allowClear width='200px' placeholder="لطفا شهر را وارد نمایید..." onSearch={setSearchCityName}
                        style={{ width: '200px',fontFamily: 'Vazir', margin: 20}} />
        );

};
