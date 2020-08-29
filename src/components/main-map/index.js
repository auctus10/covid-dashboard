import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import { CircularProgress } from "@chakra-ui/core";
import MapChart from '../map-chart';


const MainMap = () => {
    const [covidData, setCovidData] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://corona.lmao.ninja/v2/countries');

            setCovidData(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    if(covidData.length === 0) return <CircularProgress isIndeterminate color="green" />

    return(
        <>
            <MapChart covidData={covidData} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </>
    )
}

export default MainMap;