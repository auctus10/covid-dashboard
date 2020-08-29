import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import MapChart from '../map-chart';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

   if(covidData.length === 0) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}> <PacmanLoader
    css={override}
     size={25}
     color={"white"}
     loading={true}
   /></div>

    return(
        <>
            <Tabs>
                <TabList>
                <Tab>Visual Data</Tab>
                <Tab>Tabular Data</Tab>
                </TabList>
    
                <TabPanel>
                    <MapChart covidData={covidData} setTooltipContent={setContent} />
                    <ReactTooltip>{content}</ReactTooltip>
                </TabPanel>
                <TabPanel>
                <h2>Any content 2</h2>
                </TabPanel>
             </Tabs>
    
        </>
    )
}

export default MainMap;