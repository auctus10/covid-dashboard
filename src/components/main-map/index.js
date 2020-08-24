import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MapChart from '../map-chart';


const MainMap = () => {
    const [covidData, setCovidData] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchData();
    },[]);

    const mapRef = useRef();

    const fetchData = async () => {
        try {
            const response = await axios.get('https://corona.lmao.ninja/v2/countries');

            setCovidData(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <MapChart setTooltipContent={setContent} />
        </>
    )
}

export default MainMap;