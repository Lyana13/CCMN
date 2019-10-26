import React from "react";
import { Card, Accordion } from "react-bootstrap";
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import DwellChart from "./DwellChart";
import chartLib from "./chartLib";
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

class Content extends React.Component  {
  
    constructor(props){
        super(props);

        this.state = {
            dates: [new Date(), new Date()],
            connected: "",
            all: "",
            detected: "",
            activeUser: "",
            kpi: "",
            alalitics: "",
            forecasting: "",
            sitesID: "",
            selectedRange: optionsRange[0],
            displayCalendar: "none",
            chartsRange: optionsRange[0].value
        }
        this.updateTotalConnectedCount = this.updateTotalConnectedCount.bind(this);
    }

    async componentDidMount() {
        this.updateTotalConnectedCount();
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
        let chartRange;
        let displayCalendar = "none";
        if(selectedRange.value == "Custom Date")
            displayCalendar = "block";
        else
            chartRange = selectedRange.value
        // this.updateRangeDays(selectedRange.value);
        this.setState({ selectedRange, displayCalendar, chartsRange: chartRange});
    }
    applyRange(e){
        var re = chartLib.dateToString(e);
        console.log("e",re);
        var s = e.toLocaleDateString();
        console.log("s",s);
    }
    
    onCalendarChange = dates => {
        console.log("dates", dates);
        this.setState({ dates })
    }

    render(){
        return (   
            <Container>
            <Row>
                <Col xs={12} sm={6} md={8} lg={9}>
                <DwellChart range={this.state.chartsRange} />
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
                <div style={{boxShadow: "5px 5px 25px", width: "350px", display: this.state.displayCalendar }}>
                <div onClick={this.reset}>
                    <Calendar 
                        onChange={this.onCalendarChange}
                        selectRange={true}
                        value={this.state.dates}
                    />
                </div>
                <button onClick={this.applyRange}>Apply</button>
            </div>  
            </Col>
                <Col xs={12} sm={6} md={8} lg={9}>
                <RepeatVisitors range={this.state.chartsRange} />
                </Col> 
        </Row> 
    </Container>
        )
    }
}
export default Content;