import React from "react";
import { Button, Tabs,  Tab, Nav, ButtonGroup, Card, Accordion } from "react-bootstrap";
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import DwellChart from "./DwellChart";
import AWN from 'awesome-notifications';
import "awesome-notifications/dist/style.css";
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar'


const options = [
    { value: '1st_Floor', label: 'First' },
    { value: '2nd_Floor', label: 'Second' },
    { value: '3rd_Floor', label: 'Third' },
  ];
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
            image: "",
            selectedFloor: { value: '1st_Floor', label: 'First' },
            clients: [],
            connected: "",
            all: "",
            detected: "",
            activeUser: "",
            kpi: "",
            alalitics: "",
            forecasting: "",
            visitsCountMap: new Map(),
            sitesID: "",
            selectedRange: { value: 'Today', label: 'Today' },
            displayCalendar: "none"
        }
        this.updateTotalConnectedCount = this.updateTotalConnectedCount.bind(this);
        this.updateFloorImage = this.updateFloorImage.bind(this);
    }

    async componentDidMount() {
        this.updateFloorImage(this.state.selectedFloor.value);
        this.updateTotalConnectedCount();
        this.sit();
        let notifier = new AWN({});
        setInterval(async () => {
            this.updateTotalConnectedCount();
            
            let oldClients = this.state.clients,
                newClients = await cmxAPI.getAllClients();
            this.setState({clients: newClients});
            if (oldClients.length == 0) {
                oldClients = newClients;
            }
            var newMacAdresses = this.getNewMacAdresses(oldClients, newClients);
            newMacAdresses.forEach(macAddr => {
                notifier.info("Hi, @xlogin or mac: " + macAddr + " now is on the " + this.state.selectedFloor.label.toLowerCase() + " floor", {});
            });
        }, 1000);
        cmxAPI.getFloorsInfo(floorList => {
            let visitsCountMap = new Map();
                floorList.forEach(floor => {
                    console.log("floor", floor)
                    visitsCountMap.set(floor.name, floor.aesUidString);
                })
                this.setState({visitsCountMap: visitsCountMap});
        });
        let sitesID = await cmxAPI.getSitesIP();
        this.setState( {sitesID: sitesID} );
        console.log("UId", sitesID);
       cmxAPI.topDevicesMacers(sitesID, data => console.log("topDevicesMacers", data));
       cmxAPI.newF(cs => console.log("newee", cs));
        
    }
    sit(){
        cmxAPI.getActiveClients(cb => this.setState({
            activeUser: cb.data
        }));
    }
    updateTotalConnectedCount() {
        cmxAPI.getTotalConnectedCount(total => this.setState({
            all: total.totalAll,
            connected: total.totalConnected,
            detected: total.totalDetected
        }));
    }

    updateFloorImage(Floor) {
        cmxAPI.getFloorImage(Floor, image => this.setState({ image }));
    }


    handleFloorChange = selectedFloor => {
        this.updateFloorImage(selectedFloor.value);
        this.setState({ selectedFloor });
    };

    handleRangeChange = selectedRange => {
        let displayCalendar = "none";
        if(selectedRange.value == "Custom Date")
            displayCalendar = "block";
        // this.updateRangeDays(selectedRange.value);
        this.setState({ selectedRange, displayCalendar});
    }

    macAdressesFromClients(clients) {
        return clients.map(client => client.macAddress);
    }

    getNewMacAdresses(oldClients, updatedClients){
        oldClients = this.macAdressesFromClients(oldClients)
        updatedClients = this.macAdressesFromClients(updatedClients)
        return updatedClients.filter(e => !oldClients.includes(e));
    }

    render(){
        const floorName = this.state.selectedFloor.value,
        floorId = this.state.visitsCountMap.get(floorName);
        return (   
        <div className="main">
            <Grid container spacing={2}>
                <Grid>
                    <div style={{
                        backgroundImage: "url(" + this.state.image + ")",
                        backgroundSize: 'cover',
                        width: 775,
                        height: 385,
                        position: 'absolute',
                        margin: "0% 4%",
                    }} id="content__map">
                        {this.state.clients
                            .filter(client => floorId == client.mapInfo.floorRefId)
                            .map(client => {
                                return <div key={client.macAddress} style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'blue',
                                    position: 'absolute',
                                    left: client.mapCoordinate.x / 2 - 5,
                                    top: client.mapCoordinate.y / 2 - 5
                                }}>
                                </div>
                                }
                            )
                        }
                    </div>
                </Grid>
        <Grid item xs={6} sm={9} >
            <div className="sel">
                <Select 
                value={this.state.selectedFloor}
                onChange={this.handleFloorChange}
                options={options}
            />
            <Select 
                value={this.state.selectedRange}
                onChange={this.handleRangeChange}
                options={optionsRange}
            />
            </div>   
        </Grid>
        <Grid item xs={6} sm={3}>
            <ul className="list-group content-wrap-text">
                <li className="list-group-item list-group-item-action list-group-item-light">Connected: <span className="highlight">{this.state.connected}</span><strong><span id="inner1"></span></strong></li>
                <li className="list-group-item list-group-item-action list-group-item-light">All: <span className="highlight">{this.state.all}</span><strong><span id="inner2"></span></strong></li>
                <li className="list-group-item list-group-item-action list-group-item-light">Detected: <span className="highlight">{this.state.detected}</span><strong><span id="inner3"></span></strong></li>
                <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    Show me Active users: 
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body><li className="list-group-item list-group-item-action list-group-item-light">Active users: <span className="highlight"></span><strong><span id="inner4"></span></strong></li></Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            </ul>
            <ButtonGroup  vertical>
                <Button variant="outline-secondary">Active users: </Button>
                <Button variant="outline-secondary">KPI: {this.state.kpi}</Button>
                <Button variant="outline-secondary">Analitics and Presence: {this.state.alalitics}</Button>
                <Button variant="outline-secondary">Forecasting number of visitors: {this.state.forecasting}</Button>
            </ButtonGroup>
        </Grid> 
    </Grid>
    <DwellChart range={this.state.selectedRange.value} />
    <div style={{boxShadow: "5px 5px 25px", width: "350px", boxShadow: "5px 5px 25px", display: this.state.displayCalendar }}>
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
    </div>
           
        )
    }
}

export default Content;