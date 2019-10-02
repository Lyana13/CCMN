import React, {Component, Fragment} from "react";
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Content from "./components/Content.js";
import Chart from "./components/Chart";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
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
      <React.Fragment>
        <Container>
        <Header />
        <Content />
        <Footer />
        <Chart chartData={this.state.chartData}/>
        </Container>
      </React.Fragment>
    );
  }
  }
  
export default App;
