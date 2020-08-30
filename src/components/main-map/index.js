import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import MapChart from '../map-chart';

const TabularData = React.lazy(() => import('../table-component'));

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
            const response = await axios.get('https://corona.lmao.ninja/v2/countries?sort=cases');

            setCovidData(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    const renderLoader = () => (
<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}> <PacmanLoader
    css={override}
     size={25}
     color={"white"}
     loading={true}
   /></div>
    )

   if(covidData.length === 0) return renderLoader()

    return(
        <>
            <Tabs>
                <TabList>
                <Tab>Visual Data</Tab>
                <Tab>Tabular Data</Tab>
                </TabList>
    
                <TabPanel>
										<h1 style={{marginTop: '5rem'}}>Map showing the death rate due to Covid - 19</h1>
                    <MapChart covidData={covidData} setTooltipContent={setContent} />
                    <ReactTooltip>{content}</ReactTooltip>
                </TabPanel>
                <TabPanel>
                    <Suspense fallback={renderLoader()}>
                        <TabularData renderLoader={renderLoader()} covidData={covidData} />
                    </Suspense>
                </TabPanel>
             </Tabs>
        </>
    )
}

export default MainMap;