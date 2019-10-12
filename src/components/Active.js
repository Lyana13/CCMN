import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import { Card} from "react-bootstrap";
import {Container, Row, Col} from "react-bootstrap";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import SpeedIcon from '@material-ui/icons/Speed';
import TimelapseIcon from '@material-ui/icons/Timelapse';

class Active extends Component  {
  
    constructor(props){
        super(props);

        this.state = {
            activeUser: "",
            totalVisitorsForDay: "",
            totalVisitors30Days: "",
            totalVisitorsForYesterday: "",
            totalVisitorsLastweek: "",
            totalVisitorsThreeDays: "",

        }
    }

    componentDidMount() {
        this.totalVisitorsForDay();
        this.totalVisitorsForYesterday();
        this.totalVisitorsThreeDays();
        this.totalVisitorsLastweek();
        this.totalVisitors30Days();
        this.sit();
    }

    totalVisitorsForDay(){
        cmxAPI.totalVisitorsToday(data => this.setState({
            totalVisitorsForDay: data
        }));
    }
    totalVisitorsForYesterday(){
        cmxAPI.totalVisitorsYesterday(data => this.setState({
            totalVisitorsForYesterday: data
        }));
    }
    totalVisitorsThreeDays(){
        cmxAPI.totalVisitorsThreeDays(data => this.setState({
            totalVisitorsThreeDays: data
        }));
    }
    totalVisitorsLastweek(){
        cmxAPI.totalVisitorsLastweek(data => this.setState({
            totalVisitorsThreeDays: data
        }));
    }
    totalVisitors30Days(){
        cmxAPI.totalVisitors30Days(data => this.setState({
            totalVisitors30Days: data
        }));
    }
    
    sit(){
        cmxAPI.getActiveClients(cb => this.setState({
            activeUser: cb.data
        }));
    }
    render(){
        return(
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <Card.Body style={{ maxWidth: 300 }}>
                    <li className="list-group-item list-group-item-action list-group-item-light colorTwoStep">
                    totalVisitors30Days:
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsForDay}</span>
                        <QueryBuilderIcon  style={{ fontSize: 25 }}>
                        </QueryBuilderIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorOneStep">
                    totalVisitors30Days: 
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsForYesterday}</span>
                        <ImportantDevicesIcon style={{ fontSize: 25 }}>
                        </ImportantDevicesIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorTwoStep">
                    totalVisitors30Days: 
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsThreeDays}</span>
                    <SpeedIcon style={{ fontSize: 25 }}>
                    </SpeedIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorOneStep">
                    totalVisitors30Days: 
                    <span  className="highlight">{this.state.totalVisitors30Days}</span>
                        <TimelapseIcon style={{ fontSize: 20 }}>
                        </TimelapseIcon>
                    </li>
                {/* <li className="list-group-item list-group-item-action list-group-item-light">
                Active users: <span className="highlight">{this.state.activeUser}</span><strong><span id="inner4"></span></strong>
                </li> */}     
            </Card.Body>
            <Card.Body style={{ maxWidth: 300 }}>
                    <li className="list-group-item list-group-item-action list-group-item-light colorTwoStep">
                    totalVisitors30Days:
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsForDay}</span>
                        <QueryBuilderIcon  style={{ fontSize: 25 }}>
                        </QueryBuilderIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorOneStep">
                    totalVisitors30Days: 
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsForYesterday}</span>
                        <ImportantDevicesIcon style={{ fontSize: 25 }}>
                        </ImportantDevicesIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorTwoStep">
                    totalVisitors30Days: 
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsThreeDays}</span>
                    <SpeedIcon style={{ fontSize: 25 }}>
                    </SpeedIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorOneStep">
                    totalVisitors30Days: 
                    <span className="highlight">{this.state.totalVisitors30Days}</span>
                        <TimelapseIcon style={{ fontSize: 20 }}>
                        </TimelapseIcon>
                    </li>
                {/* <li className="list-group-item list-group-item-action list-group-item-light">
                Active users: <span className="highlight">{this.state.activeUser}</span><strong><span id="inner4"></span></strong>
                </li> */}     
            </Card.Body>
            <Card.Body style={{ maxWidth: 300 }}>
                    <li className="list-group-item list-group-item-action list-group-item-light colorTwoStep">
                    totalVisitors30Days:
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsForDay}</span>
                        <QueryBuilderIcon  style={{ fontSize: 25 }}>
                        </QueryBuilderIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorOneStep">
                    totalVisitors30Days: 
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsForYesterday}</span>
                        <ImportantDevicesIcon style={{ fontSize: 25  }}>
                        </ImportantDevicesIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorTwoStep">
                    totalVisitors30Days: 
                    <span style={{ paddingLeft: 3, paddingRight: 3}} className="highlight">{this.state.totalVisitorsThreeDays}</span>
                    <SpeedIcon style={{ fontSize: 25 }}>
                    </SpeedIcon>
                    </li>
                    <li className="list-group-item list-group-item-action list-group-item-light colorOneStep">
                    totalVisitors30Days: 
                    <span  className="highlight">{this.state.totalVisitors30Days}</span>
                        <TimelapseIcon style={{ fontSize: 20  }}>
                        </TimelapseIcon>
                    </li>
                {/* <li className="list-group-item list-group-item-action list-group-item-light">
                Active users: <span className="highlight">{this.state.activeUser}</span><strong><span id="inner4"></span></strong>
                </li> */}     
            </Card.Body>
        </Container>    
        )
    }
}

export default Active;