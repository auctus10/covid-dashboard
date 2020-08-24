import React from 'react';
import './App.css';
import { Button } from "@chakra-ui/core";
import MainMap from './components/main-map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <Button variantColor="green">Button</Button> */}
      <MainMap />
      </header>
    </div>
  );
}

export default App;
