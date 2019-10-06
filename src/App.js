import React, {Component} from "react";
import './App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Content from "./components/Content.js";
import Chart from "./components/Chart";
import Nav from "./components/Nav.js";
import Analitics from "./components/Analitics";
import { Container } from "@material-ui/core";
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
                <Route path="/analitics"component={ Analitics } />
                <Route path="/content" component={Content} />
            </Switch> 
            <Footer /> 
          </div> 
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
