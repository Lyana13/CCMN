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
            totalVisitors: "",
            activeUser: "",
            kpi: "",
            alalitics: "",
            forecasting: "",
            selectedRange: optionsRange[0],
            displayCalendar: "none",
            chartsRange: optionsRange[0].value
        }
        this.updateTotalConnectedCount = this.updateTotalConnectedCount.bind(this);
    }

    async componentDidMount() {
        this.updateTotalConnectedCount(this.state.chartsRange);
    }
    
    updateTotalConnectedCount(days) {
        if( days === "Today"){
            cmxAPI.getVisitorsCountToday(data => this.setState({
                totalVisitors: data
            }));
        }
        else if(days === "Yesterday") {
            cmxAPI.getVisitorsCountYesterday(data => this.setState({
                totalVisitors: data
            }));
        }
        else if (days === "Last 3 Days") {
            cmxAPI.getVisitorsCountThreeDays(data => this.setState({
                totalVisitors: data
            }));
        }
        else if (days === "Last 7 Days") {
            cmxAPI.getVisitorsCountSevenDays(data => this.setState({
                totalVisitors: data
            }));
        }
        else if (days === "Last 30 Days") {
            cmxAPI.getVisitorsCountThirtyDays(data => this.setState({
                totalVisitors: data
            }));
        }
        else if (days === "This Month"){
            const dates = chartLib.getThisMounthDates();
            cmxAPI.getVisitorsCountMonth(dates[0], dates[1], data => this.setState ({
                totalVisitors: data
            }));
        }
        else if (days === "Last Month") {
            const dates = chartLib.getLastMonthDates();
            cmxAPI.getVisitorsCountMonth(dates[0], dates[1], data => this.setState ({
                totalVisitors: data
            }));
        }
        else {
            cmxAPI.getVisitorsCountMonth(days[0], days[1], data => this.setState ({
                totalVisitors: data
            }));
        }
    }

    handleRangeChange = selectedRange => {
        let { chartsRange } = this.state;
        let displayCalendar = "none";
        if(selectedRange.value == "Custom Date")
            displayCalendar = "block";
        else{
            chartsRange = selectedRange.value
            this.updateTotalConnectedCount(chartsRange);
        }
        // this.updateRangeDays(selectedRange.value);
        this.setState({ selectedRange, displayCalendar, chartsRange});
        
    
    }

    applyRange = e => {
        let { dates } = this.state;
        let chartsRange = [chartLib.dateToString(dates[0]), chartLib.dateToString(dates[1])];
        this.updateTotalConnectedCount(chartsRange);
        this.setState({ chartsRange });
    }
    
    onCalendarChange = dates => {
        console.log("dates", dates);
        this.setState({ dates })
    }

    render(){
        return (   
            <Container >
            <Row className="wrap">
                <Col lg={8}>
                <DwellChart range={this.state.chartsRange} />
                </Col>
                <Col className="sidebarContent" xs={12} sm={6} md={4} lg={3}>   
                <ul className="list-group content-wrap-text">
                    <Accordion defaultActiveKey="0"> 
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                            <li className="list-group-item list-group-item-action list-group-item-light">Total Visitors: <span className="highlight">{this.state.totalVisitors}</span><strong><span id="inner1"></span></strong></li>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <img id="pas" src="/dog.jpg" alt="dog" />
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
                <div className ="calendar" onClick={this.reset}>
                    <Calendar 
                        onChange={this.onCalendarChange}
                        selectRange={true}
                        value={this.state.dates}
                    />
                </div>
                <button onClick={this.applyRange}>Apply</button>
            </div>  
            </Col>
                <Col lg={8}>
                <RepeatVisitors range={this.state.chartsRange} />
                </Col> 
        </Row> 
    </Container>
        )
    }
}

export default Content;