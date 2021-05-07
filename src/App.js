import './App.scss';
import React from 'react';
import { Switch, Route, BrowserRouter} from "react-router-dom";
import {ConcentrationGame} from './ConcentrationGame';
import {DashBoard} from './DashBoard';

class App extends React.Component{
    


render(){

  
  return (

    <div className="App">
      

        <BrowserRouter>
          <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/startGame/row/:row/col/:col" component={ConcentrationGame} />
          </Switch>
          </BrowserRouter>
        
    </div>




  );


}
  
}

export default App;