import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear()
  .domain([1, 250000])
  .range(["#ffedea", "#ff5233"]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const MapChart = ({ setTooltipContent, covidData }) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
      <Sphere stroke="#E4E5E6" strokeWidth={0.1} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.1} step={[10, 10]} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { NAME, ISO_A3 } = geo.properties;
                const country = covidData.find(nation => nation.countryInfo.iso3 === ISO_A3);
                const color = country ? colorScale(country["deaths"]) : "#F5F4F6";
                return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if(country){
                      setTooltipContent(
                        <>
                          <h3>{NAME}</h3>
                          <p>Total Cases - {numberWithCommas(country.cases)}</p>
                          <p>Total Deaths - {numberWithCommas(country.deaths)}</p>
                          <p>Total Recovered - {numberWithCommas(country.recovered)}</p>
                          <p>New Cases - {numberWithCommas(country.todayCases)}</p>
                        </>);
                    }else{
                      setTooltipContent(`${NAME} - Data unavailable `)
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: color,
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
                )
                })
            }
          </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
