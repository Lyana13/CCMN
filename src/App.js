import React, {Component} from "react";
import './App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Content from "./components/Content.js";
import Chart from "./components/Chart";
import Nav from "./components/Nav.js";
import Corelation from "./components/Corelation.js";
import RepeatVisitors from "./components/RepeatVisitors.js";
import Floor from "./components/Floor.js";
import Active from "./components/Active.js";
import Analitics from "./components/Analitics";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

componentWillMount(){
  this.getChartData();
}

  getChartData(){
    //Ajax calls
    this.setState({
      
    });
  }

  render() {
    return (
        <Router> 
            <Header />
            <Nav />
            <Switch>
                <Route path="/chart" component={ Chart } chartData={this.state.chartData}/>
                <Route path="/analitics" component={ Analitics } />
                <Route path="/repeat_visitors" component={ RepeatVisitors } />
                <Route path="/floor" exact component={ Floor } />
                <Route path="/corelation" component={ Corelation } />
                <Route path="/active" component={ Active } />
                <Route path="/content" component={Content} />
            </Switch> 
            <Footer /> 
        </Router> 
      );
  }
}
const na = {
  color: 'red'
}
  const Home = () => (
      <div>
        <h1 style={na}>Home Page</h1>
      </div>
    );

  
export default App;