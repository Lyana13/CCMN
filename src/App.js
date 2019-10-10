import React, {Component} from "react";
import './App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Content from "./components/Content.js";
import Chart from "./components/Chart";
import Nav from "./components/Nav.js";
import KPI from "./components/KPI.js";
import Home from "./components/Home.js";
import Map from "./components/Map.js";
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
          <div>
            <Header />
            <Nav />
            <Switch>
               <Route path="/" exact component={ Home } />
                <Route path="/chart" component={ Chart } chartData={this.state.chartData}/>
                <Route path="/analitics" component={ Analitics } />
                <Route path="/kpi" component={ KPI } />
                <Route path="/repeat_visitors" component={ RepeatVisitors } />
                <Route path="/floor" component={ Floor } />
                <Route path="/maps" component={ Map } />
                <Route path="/active" component={ Active } />
                <Route path="/content" component={Content} />
            </Switch> 
            <Footer /> 
          </div> 
        </Router> 
      );
  }
}
// const na = {
//   color: 'red'
// }
//   const Home = () => (
//       <div>
//         <h1 style={na}>Home Page</h1>
//       </div>
//     );

  
export default App;