import React, {Component, Fragment} from "react";
import logo from './logo.svg';
import './App.css';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Content from "./Content.js";
import Chart from "./Chart";
import axios from 'axios';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Button variant="contained" color="secondary">
      Hi
    </Button>
        <Header />
        <Content />
        <Footer />
        <Chart />
      </React.Fragment>
    );
  }
  }
  
export default App;
