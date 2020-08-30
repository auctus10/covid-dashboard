import React, { useReducer } from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
import 'rsuite-table/dist/css/rsuite-table.css';

function sortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      const direction = state.direction === 'ascending' ? 'desc' : 'asc';
      return {
        ...state,
        column: action.column,
        data:  _.orderBy(state.data, [action.column], [direction]),
        direction:
          state.direction === 'ascending' ? 'descending' : 'ascending',
      }
    default:
      throw new Error()
  }
}

const TabularData = ({covidData }) => {
    const [state, dispatch] = useReducer(sortReducer, {
      column: null,
      data: covidData,
      direction: 'descending',
    })
    const { column, data, direction } = state

   return(
        <div className="table-container">
         	<h1>Reported Cases and Deaths by Country, Territory, or Conveyance</h1>
            <Table inverted style={{marginBottom: '5rem', backgroundColor: '#332b2b'}} sortable celled fixed>
              <Table.Header>
                <Table.Row>

                  <Table.HeaderCell
                    sorted={column === 'country' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'country' })}
                  >
                    Country
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'cases' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'cases' })}
                  >
                    Total Cases
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'todayCases' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'todayCases' })}
                  >
                    New Cases
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'deaths' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'deaths' })}
                  >
                    Total Deaths
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'todayDeaths' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'todayDeaths' })}
                  >
                    New Deaths
                  </Table.HeaderCell>
  
                  <Table.HeaderCell
                    sorted={column === 'recovered' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'recovered' })}
                  >
                    Total Recovered
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'active' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'active' })}
                  >
                    Active Cases
                  </Table.HeaderCell>
  
                  <Table.HeaderCell
                    sorted={column === 'critical' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'critical' })}
                  >
                    Serious, Critial
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'casesPerOneMillion' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'casesPerOneMillion' })}
                  >
                    Cases/1M pop.
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'deathsPerOneMillion' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'deathsPerOneMillion' })}
                  >
                    Deaths/1M pop.
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'tests' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'tests' })}
                  >
                    Total Tests
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'testsPerOneMillion' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'testsPerOneMillion' })}
                  >
                    Tests/1M pop.
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'population' ? direction : null}
                    onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'population' })}
                  >
                    Population
                  </Table.HeaderCell>
          
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map(({ country, cases, todayCases, deaths, todayDeaths, recovered, active, critical, casesPerOneMillion, deathsPerOneMillion, tests, testsPerOneMillion, population }) => (
                  <Table.Row key={country}>
                    <Table.Cell>{country}</Table.Cell>
                    <Table.Cell>{cases}</Table.Cell>
                    <Table.Cell>{todayCases}</Table.Cell>
                    <Table.Cell>{deaths}</Table.Cell>
                    <Table.Cell>{todayDeaths}</Table.Cell>
                    <Table.Cell>{recovered}</Table.Cell>
                    <Table.Cell>{active}</Table.Cell>
                    <Table.Cell>{critical}</Table.Cell>
                    <Table.Cell>{casesPerOneMillion}</Table.Cell>
                    <Table.Cell>{deathsPerOneMillion}</Table.Cell>
                    <Table.Cell>{tests}</Table.Cell>
                    <Table.Cell>{testsPerOneMillion}</Table.Cell>
                    <Table.Cell>{population}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table> 
   		</div>
   )
}

export default TabularData;