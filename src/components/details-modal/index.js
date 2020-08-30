import React from 'react'
import { Button, Header, Icon, Modal, Card, List, Flag } from 'semantic-ui-react'
import _ from 'lodash';

const DetailsModal = ({nation, open, setOpen}) => {

  if(!nation) return  (<Modal
  closeIcon
  open={open}
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
  header='No Data Available'
/>)

  const {country, cases, deaths, recovered, population, continent, countryInfo} = nation;

  const flag = <Flag name={countryInfo ? countryInfo.iso2.toLowerCase() : ''} />;

  console.log('key', nation)
 

  return(
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      
      <Header>{flag}  {continent} - {country}</Header>
      <Modal.Content>
        <Card>
          <Card.Content header='Details' />
          <List>
              {_.map(nation, function(value, key) {
                if(key === 'countryInfo'){
                  return null
                }
                return (
                  <List.Item>
                    <List.Header>{key}</List.Header>
                    {value}
                  </List.Item>
                );
              })}
            </List>
        </Card>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DetailsModal