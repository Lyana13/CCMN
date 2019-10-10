import React from "react";
import { Card, Accordion } from "react-bootstrap";
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import DwellChart from "./DwellChart";
import RepeatVisitors from "./RepeatVisitors";
import Calendar from 'react-calendar'
import {Container, Row, Col} from "react-bootstrap";


  const optionsRange = [
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'Last 3 Days', label: 'Last 3 Days' },
    { value: 'Last 7 Days', label: 'Last 7 Days' },
    { value: 'Last 30 Days', label: 'Last 30 Days' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Custom Date', label: 'Custom Date' },
  ];
  const optionsRangeRepeatVisitors = [
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'Last 3 Days', label: 'Last 3 Days' },
  ];

class Content extends React.Component  {
  
    constructor(props){
        super(props);

        this.state = {
            connected: "",
            all: "",
            detected: "",
            activeUser: "",
            kpi: "",
            alalitics: "",
            forecasting: "",
            sitesID: "",
            selectedRange: { value: 'Today', label: 'Today' },
            selectedRangeRepeatVisitors: { value: 'Yesterday', label: 'Yesterday' },
            displayCalendar: "none"
        }
        this.updateTotalConnectedCount = this.updateTotalConnectedCount.bind(this);
    }

    async componentDidMount() {
        this.updateTotalConnectedCount();
       setInterval(async () => {
        this.updateTotalConnectedCount();
       }, 1000);
        let sitesID = await cmxAPI.getSitesIP();
        this.setState( {sitesID: sitesID} );
        
    }
    
    updateTotalConnectedCount() {
        cmxAPI.getTotalConnectedCount(total => this.setState({
            all: total.totalAll,
            connected: total.totalConnected,
            detected: total.totalDetected
        }));
    }

    handleRangeChange = selectedRange => {
        let displayCalendar = "none";
        if(selectedRange.value === "Custom Date")
            displayCalendar = "block";
        // this.updateRangeDays(selectedRange.value);
        this.setState({ selectedRange, displayCalendar});
    }
    handleRangeChangeRepead = selectedRangeRepeatVisitors => {
        this.setState({ selectedRangeRepeatVisitors });
    }

    render(){
        return (   
            <Container md={10} lg={10}>
            <Row>
                <Col xs={12} sm={6} md={8} lg={9}>
                <DwellChart range={this.state.selectedRange.value} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>   
                <ul className="list-group content-wrap-text">
                    <Accordion defaultActiveKey="0"> 
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">INFO
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <li className="list-group-item list-group-item-action list-group-item-light">Connected: <span className="highlight">{this.state.connected}</span><strong><span id="inner1"></span></strong></li>
                                    <li className="list-group-item list-group-item-action list-group-item-light">All: <span className="highlight">{this.state.all}</span><strong><span id="inner2"></span></strong></li>
                                    <li className="list-group-item list-group-item-action list-group-item-light">Detected: <span className="highlight">{this.state.detected}</span><strong><span id="inner3"></span></strong></li>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </ul>
                <Select 
                    value={this.state.selectedRange}
                    onChange={this.handleRangeChange}
                    options={optionsRange}
                />
            </Col>
        </Row> 
        <Row>
        <Col xs={12} sm={6} md={8} lg={9}>
                <RepeatVisitors range={this.state.selectedRangeRepeatVisitors.value} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>   
                <ul className="list-group content-wrap-text">
                    <Accordion defaultActiveKey="0"> 
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">INFO
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <li className="list-group-item list-group-item-action list-group-item-light">Connected: <span className="highlight">{this.state.connected}</span><strong><span id="inner1"></span></strong></li>
                                    <li className="list-group-item list-group-item-action list-group-item-light">All: <span className="highlight">{this.state.all}</span><strong><span id="inner2"></span></strong></li>
                                    <li className="list-group-item list-group-item-action list-group-item-light">Detected: <span className="highlight">{this.state.detected}</span><strong><span id="inner3"></span></strong></li>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </ul>
                <Select 
                    value={this.state.selectedRangeRepeatVisitors}
                    onChange={this.handleRangeChangeRepead}
                    options={optionsRangeRepeatVisitors}
                />
            </Col>
        </Row>
        
        <Row>
        <Col md={2} lg={2}>
            <div style={{boxShadow: "5px 5px 25px", width: "350px", display: this.state.displayCalendar }}>
                <div onClick={this.reset}>
                    <Calendar 
                    onChange={this.onChange}
                    selectRange={true}
                    value={this.state.date}
                    />
                </div>
                {/* <p>Date choose: {this.state.date.toLocaleDateString()}</p> */}
                <button onClick={this.validation}>Valid</button>
                {this.state.showDate ? (
                    <div>
                        <p>Yes: {this.state.date[0].toLocaleDateString()}</p>
                        <p>No: {this.state.date[1].toLocaleDateString()}</p>
                    </div>
                ) : null}
                 {/* <DwellChart calendar={this.state.date} /> */}
            </div>
            </Col>
        </Row>
    
    </Container>
        )
    }
}
export default Content;