import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import MapChart from '../map-chart';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



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

   if(covidData.length === 0) return  <PacmanLoader
    css={override}
     size={25}
     color={"white"}
     loading={true}
   />

    return(
        <>
            <MapChart covidData={covidData} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </>
    )
}

export default MainMap;