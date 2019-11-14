import React, {Component} from "react";
import './App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Content from "./components/Content.js";
import Chart from "./components/Chart";
import Nav from "./components/Nav.js";
import Corelation from "./components/Corelation.js";
import Floor from "./components/Floor.js";
import NotFound from "./components/NotFound.js";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {s

  render() {
    return (
        <Router> 
            <Header />
            <Nav />
            <Switch>
                <Route path="/chart" component={ Chart }/>
                <Route path="/floor" exact component={ Floor } />
                <Route path="/corelation" component={ Corelation } />
                <Route path="/content" component={Content} />
                <Route component={NotFound} />
            </Switch> 
            <Footer /> 
        </Router> 
      );
  }
}
  
export default App;