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
      chartData:{
        labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets:[
            {
                label:'Population',
                data:[
                    550,
                    500,
                    400,
                    700,
                    500,
                    800,
                    300
                ],
                backgroundColor:[
                    'rgba(102,51,153,1)',
                    'rgba(102,51,153,1)',
                    'rgba(102,51,153,1)',
                    'rgba(102,51,153,1)',
                    'rgba(255, 66, 33, 0.8)',
                    'rgba(255, 66, 33, 0.8)',
                    'rgba(255, 66, 33, 0.8)'
                ]
            }
        ]
    }
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
